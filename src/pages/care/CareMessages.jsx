import React, { useState, useEffect, useRef } from "react";
import { Send, User, Headphones, Wrench, Sparkles } from "lucide-react";
import { base44 } from "@/api/base44Client";

const ROLE_ICONS = {
  client: User,
  salesperson: Headphones,
  installer: Wrench,
  care: Sparkles,
  system: Sparkles,
};

const ROLE_LABELS = {
  client: "You",
  salesperson: "Sales",
  installer: "Installer",
  care: "Care Team",
  system: "System",
};

const GOLD_GRADIENT = "linear-gradient(180deg, #FFF6D5 0%, #D4AF37 45%, #8B6914 100%)";

export default function CareMessages() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [project, setProject] = useState(null);
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);

  useEffect(() => {
    const load = async () => {
      try {
        const me = await base44.auth.me();
        const projects = await base44.entities.ClientProject.filter({ client_email: me.email });
        const p = projects[0];
        setProject(p);
        if (p) {
          const msgs = await base44.entities.ChatMessage.filter({ project_id: p.id });
          setMessages(msgs);
        }
      } catch (err) {
        console.error("Messages load error", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // Subscribe to new messages
  useEffect(() => {
    if (!project) return;
    const unsubscribe = base44.entities.ChatMessage.subscribe((event) => {
      if (event.data?.project_id === project.id) {
        if (event.type === "create") {
          setMessages((prev) => [...prev, event.data]);
        }
      }
    });
    return unsubscribe;
  }, [project]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!newMessage.trim() || !project) return;
    setSending(true);
    try {
      const me = await base44.auth.me();
      const msg = await base44.entities.ChatMessage.create({
        project_id: project.id,
        sender_name: me.full_name || "Client",
        sender_role: "client",
        text: newMessage.trim(),
      });
      setMessages((prev) => [...prev, msg]);
      setNewMessage("");
    } catch (err) {
      console.error("Send error", err);
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-stone-200 border-t-amber-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-3 py-2 border-b border-stone-200 bg-white">
        <h1 className="text-base font-black text-stone-900">Group Messages</h1>
        <p className="text-[10px] text-stone-500">
          Chat with your project team — everyone in one place
        </p>
        {project?.assigned_team?.length > 0 && (
          <div className="flex items-center gap-1 mt-1">
            {project.assigned_team.map((name, i) => (
              <span
                key={i}
                className="text-[9px] bg-stone-100 text-stone-600 px-1.5 py-0.5 rounded-full"
              >
                {name}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 space-y-2">
        {messages.length === 0 ? (
          <div className="text-center py-8">
            <Send className="h-10 w-10 text-stone-300 mx-auto mb-2" />
            <p className="text-sm font-semibold text-stone-700">No messages yet</p>
            <p className="text-xs text-stone-500 mt-1">
              Send a message to your team to get the conversation started.
            </p>
          </div>
        ) : (
          messages.map((msg) => {
            const isMe = msg.sender_role === "client";
            const Icon = ROLE_ICONS[msg.sender_role] || User;
            return (
              <div
                key={msg.id}
                className={`flex gap-2 ${isMe ? "flex-row-reverse" : ""}`}
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                  style={
                    isMe
                      ? { background: GOLD_GRADIENT, border: "1.5px solid #000" }
                      : { background: "#f5f5f5", border: "1px solid #e5e5e5" }
                  }
                >
                  <Icon className="h-4 w-4 text-stone-900" />
                </div>
                <div className={`max-w-[75%] ${isMe ? "items-end" : "items-start"} flex flex-col`}>
                  <span className="text-[9px] text-stone-400 mb-0.5">
                    {isMe ? "You" : ROLE_LABELS[msg.sender_role] || msg.sender_name}
                  </span>
                  <div
                    className={`rounded-2xl px-3 py-2 text-sm ${
                      isMe ? "text-stone-900" : "bg-white border border-stone-200 text-stone-900"
                    }`}
                    style={isMe ? { background: GOLD_GRADIENT, border: "1.5px solid #000" } : {}}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[8px] text-stone-400 mt-0.5">
                    {new Date(msg.created_date).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Input */}
      <div className="p-3 border-t border-stone-200 bg-white">
        <div className="flex gap-2">
          <input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type a message..."
            className="flex-1 h-10 rounded-xl border border-stone-200 px-3 text-sm focus:border-amber-500 outline-none"
          />
          <button
            onClick={handleSend}
            disabled={sending || !newMessage.trim()}
            className="h-10 w-10 rounded-xl flex items-center justify-center disabled:opacity-50"
            style={{ background: GOLD_GRADIENT, border: "1.5px solid #000" }}
          >
            <Send className="h-4 w-4 text-stone-900" />
          </button>
        </div>
      </div>
    </div>
  );
}