// Shared Gmail MIME helpers — RFC 2822 message builder with HTML body and
// inline (CID) images. Used by the estimate-email backend function.

export function rfc2047(str) {
  if (/[^\x20-\x7E]/.test(str)) {
    const bytes = new TextEncoder().encode(str);
    let bin = "";
    for (const b of bytes) bin += String.fromCharCode(b);
    return `=?UTF-8?B?${btoa(bin)}?=`;
  }
  return str;
}

export function base64Url(bytes) {
  let bin = "";
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    bin += String.fromCharCode.apply(null, bytes.subarray(i, i + chunk));
  }
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export function base64Std(bytes) {
  let bin = "";
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    bin += String.fromCharCode.apply(null, bytes.subarray(i, i + chunk));
  }
  return btoa(bin);
}

// Build a MIME message with an HTML body, optional inline (CID) images, and
// optional file attachments.
// inline: [{ cid, type, bytes }]
// attachments: [{ filename, type, bytes }]
export function buildMime({ from, to, subject, html, inline = [], attachments = [] }) {
  const encSubject = rfc2047(subject);
  const head = `From: ${from}\r\nTo: ${to}\r\nSubject: ${encSubject}\r\nMIME-Version: 1.0\r\n`;

  const hasInline = inline.length > 0;
  const hasAttach = attachments.length > 0;

  if (!hasInline && !hasAttach) {
    return new TextEncoder().encode(
      head + `Content-Type: text/html; charset=UTF-8\r\n\r\n${html}`
    );
  }

  // No attachments: a single multipart/related part (html + inline images).
  if (!hasAttach) {
    const rel = "rel_" + Math.random().toString(36).slice(2);
    let msg = head + `Content-Type: multipart/related; boundary="${rel}"\r\n\r\n`;
    msg += `--${rel}\r\nContent-Type: text/html; charset=UTF-8\r\n\r\n${html}\r\n`;
    for (const img of inline) {
      const b64 = base64Std(img.bytes);
      msg += `--${rel}\r\nContent-Type: ${img.type}\r\nContent-Disposition: inline\r\nContent-ID: <${img.cid}>\r\nContent-Transfer-Encoding: base64\r\n\r\n${b64}\r\n`;
    }
    msg += `--${rel}--`;
    return new TextEncoder().encode(msg);
  }

  // Attachments present: multipart/mixed wrapping the related body + files.
  const mixed = "mix_" + Math.random().toString(36).slice(2);
  let msg = head + `Content-Type: multipart/mixed; boundary="${mixed}"\r\n\r\n`;

  if (hasInline) {
    const rel = "rel_" + Math.random().toString(36).slice(2);
    msg += `--${mixed}\r\nContent-Type: multipart/related; boundary="${rel}"\r\n\r\n`;
    msg += `--${rel}\r\nContent-Type: text/html; charset=UTF-8\r\n\r\n${html}\r\n`;
    for (const img of inline) {
      const b64 = base64Std(img.bytes);
      msg += `--${rel}\r\nContent-Type: ${img.type}\r\nContent-Disposition: inline\r\nContent-ID: <${img.cid}>\r\nContent-Transfer-Encoding: base64\r\n\r\n${b64}\r\n`;
    }
    msg += `--${rel}--\r\n`;
  } else {
    msg += `--${mixed}\r\nContent-Type: text/html; charset=UTF-8\r\n\r\n${html}\r\n`;
  }

  for (const a of attachments) {
    const b64 = base64Std(a.bytes);
    msg += `--${mixed}\r\nContent-Type: ${a.type}\r\nContent-Disposition: attachment; filename="${a.filename}"\r\nContent-Transfer-Encoding: base64\r\n\r\n${b64}\r\n`;
  }
  msg += `--${mixed}--`;
  return new TextEncoder().encode(msg);
}