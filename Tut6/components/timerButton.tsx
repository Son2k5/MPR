type TimerButtonProps = {
  label: string;
  onPress: () => void;
  color?: string;
  fullWidth?: boolean;
};
function TimerButton({ label, onPress, color = "#4f8ef7", fullWidth = false }: TimerButtonProps) {
  return (
    <button
      onClick={onPress}
      style={{
        background: color,
        color: "#fff",
        border: "none",
        borderRadius: 8,
        padding: "9px 16px",
        fontSize: 12,
        fontFamily: "'DM Mono', monospace",
        fontWeight: 700,
        cursor: "pointer",
        letterSpacing: "0.04em",
        transition: "filter 0.15s, transform 0.1s",
        width: fullWidth ? "100%" : undefined,
        lineHeight: 1.5,
      }}
      onMouseEnter={(e) => ((e.target as HTMLButtonElement).style.filter = "brightness(1.15)")}
      onMouseLeave={(e) => ((e.target as HTMLButtonElement).style.filter = "brightness(1)")}
      onMouseDown={(e) => ((e.target as HTMLButtonElement).style.transform = "scale(0.96)")}
      onMouseUp={(e) => ((e.target as HTMLButtonElement).style.transform = "scale(1)")}
    >
      {label}
    </button>
  );
}