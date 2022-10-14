import React from "react";
import styles from "../ComponentClasses.module.css";

interface CheckboxProps {
  label?: string;
  register: any;
  name?: string;
}

function CheckBox({ label, register, name }: CheckboxProps) {
  return (
    <div className="d-flex align-items-center gap-1">
      <input type="checkbox" className="border border-2" {...register(name)} />
      <span className={`${styles.label} text-muted`}>{label}</span>
    </div>
  );
}

export default CheckBox;
