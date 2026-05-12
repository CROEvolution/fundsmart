"use client";

import type { ReactNode } from "react";
import Icon from "./ui/Icon";
import ModalTrust from "./ui/ModalTrust";
import ProgressBar from "./ui/ProgressBar";
import { secondsLeft } from "@/lib/state";

type Props = {
  children: ReactNode;
  step: number;
  total: number;
  onClose: () => void;
  onBack?: () => void;
};

export default function ModalShell({ children, step, total, onClose, onBack }: Props) {
  const pct = Math.round((step / total) * 100);
  return (
    <div
      className="modal-back"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal" data-screen-label={`Quiz · Step ${step} of ${total}`}>
        <div className="modal-head">
          <div className="row gap-3" style={{ flex: 1, minWidth: 0 }}>
            {onBack && (
              <button
                className="btn ghost"
                onClick={onBack}
                aria-label="Back"
                style={{ padding: 8, height: 36, width: 36, borderRadius: 10 }}
              >
                <Icon name="ChevronLeft" size="md" />
              </button>
            )}
            <div style={{ flex: 1, minWidth: 0 }}>
              <ProgressBar
                value={pct}
                label={`Step ${step} of ${total} · About ${secondsLeft(step, total)} seconds left`}
              />
            </div>
          </div>
          <button
            className="btn ghost"
            onClick={onClose}
            aria-label="Close"
            style={{ padding: 8, height: 36, width: 36, borderRadius: 10 }}
          >
            <Icon name="X" size="md" />
          </button>
        </div>
        <div style={{ padding: "10px 20px 0", borderBottom: "1px solid var(--border)" }}>
          <ModalTrust />
          <div style={{ height: 10 }} />
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}
