"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { updateStatus, addNote } from "@/app/admin/actions";
import { STATUSES } from "@/lib/crm";

type Note = {
  id: string;
  body: string;
  author: string | null;
  created_at: string;
};

export default function LeadControls({
  leadId,
  status,
  notes,
}: {
  leadId: string;
  status: string;
  notes: Note[];
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [current, setCurrent] = useState(status);
  const [body, setBody] = useState("");
  const [error, setError] = useState<string | null>(null);

  const changeStatus = (next: string) => {
    const previous = current;
    setCurrent(next);
    setError(null);
    startTransition(async () => {
      const res = await updateStatus(leadId, next);
      if (res?.error) {
        setCurrent(previous);
        setError(res.error);
        return;
      }
      router.refresh();
    });
  };

  const submitNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!body.trim()) return;
    setError(null);
    const draft = body;
    startTransition(async () => {
      const res = await addNote(leadId, draft);
      if (res?.error) {
        setError(res.error);
        return;
      }
      setBody("");
      router.refresh();
    });
  };

  return (
    <>
      {/* Status */}
      <div className="mb-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-[#888] mb-3">
          Status
        </p>
        <div className="flex flex-wrap gap-2">
          {STATUSES.map((s) => (
            <button
              key={s}
              onClick={() => changeStatus(s)}
              disabled={pending}
              className={`font-mono text-[11px] uppercase tracking-[0.1em] px-4 py-2 rounded border transition-all disabled:opacity-50 ${
                current === s
                  ? "border-accent text-accent bg-accent/5"
                  : "border-[#222] text-[#888] hover:border-[#444] hover:text-[#F5F5F5]"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <p className="text-sm text-[#E8756B] bg-[#E8756B]/10 border border-[#E8756B]/25 rounded-lg px-4 py-3 mb-6">
          {error}
        </p>
      )}

      {/* Notes */}
      <div className="bg-[#141414] border border-[#222] rounded-xl p-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-[#888] mb-4">
          Notes
        </p>

        <form onSubmit={submitNote} className="flex flex-col gap-3 mb-6">
          <label htmlFor="note-body" className="sr-only">
            Add a note
          </label>
          <textarea
            id="note-body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={3}
            placeholder="Called and left a voicemail…"
            className="bg-[#0A0A0A] border border-[#222] text-[#F5F5F5] rounded-lg px-4 py-3 text-sm outline-none focus:border-[#444] transition-colors resize-none placeholder:text-[#888]"
          />
          <button
            type="submit"
            disabled={pending || !body.trim()}
            className="self-start bg-accent text-[#06231F] font-medium px-5 py-2.5 rounded text-sm hover:bg-accent-light transition-all disabled:opacity-50"
          >
            {pending ? "Saving…" : "Add note"}
          </button>
        </form>

        {notes.length === 0 ? (
          <p className="text-[#888] text-sm">No notes yet.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {notes.map((n) => (
              <div key={n.id} className="border-t border-[#222] pt-4">
                <p className="text-[#F5F5F5] text-sm leading-relaxed whitespace-pre-wrap">
                  {n.body}
                </p>
                <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-[#888] mt-2">
                  {n.author ? `${n.author} · ` : ""}
                  {new Date(n.created_at).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
