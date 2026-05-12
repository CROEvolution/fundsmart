"use client";

import Icon from "./Icon";

// The 2-item trust microbar that lives just under the modal head.
export default function ModalTrust() {
  return (
    <div className="modal-trust">
      <span>
        <Icon name="ShieldCheck" size="sm" /> 100+ FCA-regulated lenders
      </span>
      <span>
        <Icon name="Search" size="sm" /> Soft search only
      </span>
    </div>
  );
}
