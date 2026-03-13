import { useState, useEffect, useRef } from "react";


type Timer = {
  id: string;
  title: string;
  project: string;
  elapsed: number;
  isRunning: boolean;
};

type Screen = "Home" | "CreateTimer" | "EditTimer";

type NavigationState = {
  screen: Screen;
  params?: { timer?: Timer };
};


export function millisecondsToHuman(ms: number): string {
  const totalSecs = Math.floor(ms / 1000);
  const h = Math.floor(totalSecs / 3600);
  const m = Math.floor((totalSecs % 3600) / 60);
  const s = totalSecs % 60;
  return [h, m, s].map((v) => String(v).padStart(2, "0")).join(":");
}


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

// ════════════════════════════════════════════════
// TIMERFORM  (components/TimerForm.tsx)
// ════════════════════════════════════════════════
type TimerFormProps = {
  initialTitle?: string;
  initialProject?: string;
  onSave: (title: string, project: string) => void;
  onCancel?: () => void;
  submitLabel?: string;
};

function TimerForm({
  initialTitle = "",
  initialProject = "",
  onSave,
  onCancel,
  submitLabel = "Tạo Timer",
}: TimerFormProps) {
  const [title, setTitle] = useState<string>(initialTitle);
  const [project, setProject] = useState<string>(initialProject);
  const [error, setError] = useState<string>("");

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px 12px",
    borderRadius: 8,
    border: "1.5px solid #2a2a3a",
    background: "#0e0e1c",
    color: "#e8e6ff",
    fontFamily: "'DM Mono', monospace",
    fontSize: 13,
    outline: "none",
    boxSizing: "border-box",
    marginBottom: 14,
  };

  const handleSave = () => {
    if (!title.trim()) {
      setError("Tiêu đề không được để trống.");
      return;
    }
    setError("");
    onSave(title.trim(), project.trim());
  };

  return (
    <div>
      <label style={labelStyle}>Tiêu đề nhiệm vụ *</label>
      <input
        style={inputStyle}
        value={title}
        onChange={(e) => { setTitle(e.target.value); setError(""); }}
        placeholder="VD: Thiết kế giao diện"
        onFocus={(e) => (e.target.style.borderColor = "#4f8ef7")}
        onBlur={(e) => (e.target.style.borderColor = "#2a2a3a")}
      />

      <label style={labelStyle}>Tên dự án</label>
      <input
        style={inputStyle}
        value={project}
        onChange={(e) => setProject(e.target.value)}
        placeholder="VD: Client Alpha"
        onFocus={(e) => (e.target.style.borderColor = "#4f8ef7")}
        onBlur={(e) => (e.target.style.borderColor = "#2a2a3a")}
      />

      {error && (
        <p style={{ color: "#ff6b7a", fontSize: 12, margin: "-6px 0 10px", fontFamily: "'DM Mono', monospace" }}>
          ⚠ {error}
        </p>
      )}

      <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
        {onCancel && <TimerButton label="Hủy" onPress={onCancel} color="#2e2e4a" />}
        <TimerButton label={submitLabel} onPress={handleSave} color="#4f8ef7" />
      </div>
    </div>
  );
}

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: 10,
  fontWeight: 700,
  color: "#7b7aaa",
  textTransform: "uppercase",
  letterSpacing: "0.12em",
  marginBottom: 5,
  fontFamily: "'DM Mono', monospace",
};

// ════════════════════════════════════════════════
// TOGGLEABLETIMERFORM  (components/ToggleableTimerForm.tsx)
// ════════════════════════════════════════════════
type ToggleableTimerFormProps = {
  onSave: (title: string, project: string) => void;
};

function ToggleableTimerForm({ onSave }: ToggleableTimerFormProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleSave = (title: string, project: string) => {
    onSave(title, project);
    setIsOpen(false);
  };

  return (
    <div
      style={{
        border: "1.5px dashed #2e2e4a",
        borderRadius: 14,
        marginBottom: 14,
        overflow: "hidden",
        background: "#13132200",
      }}
    >
      {isOpen ? (
        <div style={{ padding: "16px 18px" }}>
          <p style={{ fontSize: 10, color: "#7b7aaa", letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "'DM Mono', monospace", marginBottom: 12 }}>
            TẠO TIMER MỚI
          </p>
          <TimerForm onSave={handleSave} onCancel={() => setIsOpen(false)} submitLabel="Tạo Timer" />
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            width: "100%",
            padding: "14px",
            background: "transparent",
            border: "none",
            color: "#4f8ef7",
            fontSize: 13,
            fontFamily: "'DM Mono', monospace",
            fontWeight: 700,
            cursor: "pointer",
            letterSpacing: "0.08em",
          }}
        >
          + TIMER MỚI
        </button>
      )}
    </div>
  );
}

// ════════════════════════════════════════════════
// TIMER  (components/Timer.tsx)
// ════════════════════════════════════════════════
type TimerProps = {
  id: string;
  title: string;
  project: string;
  elapsed: number;
  isRunning: boolean;
  onStartStop: (id: string) => void;
  onDelete: (id: string) => void;
  onEditStart: (id: string) => void;
};

function TimerCard({ id, title, project, elapsed, isRunning, onStartStop, onDelete, onEditStart }: TimerProps) {
  const pct = Math.min((elapsed / 3600000) * 100, 100);

  return (
    <div style={{ padding: "16px 18px" }}>
      {/* Progress bar */}
      <div style={{ height: 3, background: "#1a1a2e", borderRadius: 99, marginBottom: 14, overflow: "hidden" }}>
        <div style={{
          height: "100%",
          width: `${pct}%`,
          background: isRunning ? "linear-gradient(90deg,#4f8ef7,#9b59f7)" : "#3a3a55",
          borderRadius: 99,
          transition: "width 0.8s ease",
        }} />
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#e8e6ff", fontFamily: "'DM Mono', monospace", marginBottom: 5 }}>
            {title || "Chưa đặt tên"}
          </div>
          {project && (
            <span style={{
              fontSize: 10,
              color: "#7b7aaa",
              background: "#1e1e32",
              padding: "2px 8px",
              borderRadius: 4,
              fontFamily: "'DM Mono', monospace",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}>
              {project}
            </span>
          )}
        </div>
        <div style={{
          fontSize: 24,
          fontWeight: 700,
          color: isRunning ? "#4f8ef7" : "#5a5a7a",
          fontFamily: "'DM Mono', monospace",
          letterSpacing: "0.04em",
          transition: "color 0.3s",
          marginLeft: 12,
        }}>
          {millisecondsToHuman(elapsed)}
        </div>
      </div>

      <div style={{ display: "flex", gap: 6, justifyContent: "flex-end" }}>
        <TimerButton label="Sửa" onPress={() => onEditStart(id)} color="#2e2e4a" />
        <TimerButton label="Xóa" onPress={() => onDelete(id)} color="#5a1e2a" />
        <TimerButton
          label={isRunning ? "⏸ Dừng" : "▶ Bắt đầu"}
          onPress={() => onStartStop(id)}
          color={isRunning ? "#9b59f7" : "#27ae72"}
        />
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════
// EDITABLETIMER  (components/EditableTimer.tsx)
// ════════════════════════════════════════════════
type EditableTimerProps = TimerProps & {
  onEdit: (id: string, title: string, project: string) => void;
};

function EditableTimer({ id, title, project, elapsed, isRunning, onStartStop, onDelete, onEdit }: EditableTimerProps) {
  const [editing, setEditing] = useState<boolean>(false);

  const handleSave = (newTitle: string, newProject: string) => {
    onEdit(id, newTitle, newProject);
    setEditing(false);
  };

  return (
    <div style={{
      background: "#16162a",
      borderRadius: 14,
      border: `1.5px solid ${isRunning ? "#2e3a5e" : "#1e1e32"}`,
      marginBottom: 12,
      overflow: "hidden",
      boxShadow: isRunning ? "0 0 12px #4f8ef710" : "none",
      transition: "border-color 0.3s, box-shadow 0.3s",
    }}>
      {isRunning && (
        <div style={{
          height: 2,
          background: "linear-gradient(90deg,#4f8ef7,#9b59f7,#4f8ef7)",
          backgroundSize: "200%",
          animation: "shimmer 1.8s linear infinite",
        }} />
      )}
      {editing ? (
        <div style={{ padding: "14px 18px" }}>
          <p style={{ fontSize: 10, color: "#7b7aaa", letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "'DM Mono', monospace", marginBottom: 10 }}>
            ĐANG CHỈNH SỬA
          </p>
          <TimerForm
            initialTitle={title}
            initialProject={project}
            onSave={handleSave}
            onCancel={() => setEditing(false)}
            submitLabel="Lưu thay đổi"
          />
        </div>
      ) : (
        <TimerCard
          id={id} title={title} project={project} elapsed={elapsed} isRunning={isRunning}
          onStartStop={onStartStop} onDelete={onDelete} onEditStart={() => setEditing(true)}
        />
      )}
    </div>
  );
}

// ════════════════════════════════════════════════
// CREATE TIMER SCREEN  (app/createTimerScreen.tsx)
// ════════════════════════════════════════════════
type CreateTimerScreenProps = {
  timers: Timer[];
  setTimers: React.Dispatch<React.SetStateAction<Timer[]>>;
  goBack: () => void;
};

function CreateTimerScreen({ timers, setTimers, goBack }: CreateTimerScreenProps) {
  const handleSave = (title: string, project: string) => {
    const newTimer: Timer = {
      id: Date.now().toString(),
      title,
      project,
      elapsed: 0,
      isRunning: false,
    };
    setTimers([...timers, newTimer]);
    goBack();
  };

  return (
    <div style={screenStyle}>
      <div style={cardStyle}>
        <h2 style={screenTitleStyle}>Tạo Timer Mới</h2>
        <TimerForm onSave={handleSave} onCancel={goBack} submitLabel="💾  Lưu Timer" />
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════
// EDIT TIMER SCREEN  (app/editTimerScreen.tsx)
// ════════════════════════════════════════════════
type EditTimerScreenProps = {
  timer: Timer;
  timers: Timer[];
  setTimers: React.Dispatch<React.SetStateAction<Timer[]>>;
  goBack: () => void;
};

function EditTimerScreen({ timer, timers, setTimers, goBack }: EditTimerScreenProps) {
  const handleSave = (title: string, project: string) => {
    setTimers((prev) =>
      prev.map((t) => (t.id === timer.id ? { ...t, title, project } : t))
    );
    goBack();
  };

  return (
    <div style={screenStyle}>
      <div style={cardStyle}>
        <h2 style={screenTitleStyle}>Chỉnh Sửa Timer</h2>

        {/* Hiển thị thời gian hiện tại */}
        <div style={{
          background: "#0e0e1c",
          borderRadius: 10,
          padding: "10px 14px",
          marginBottom: 20,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          border: "1px solid #2a2a3a",
        }}>
          <span style={{ fontSize: 11, color: "#7b7aaa", fontFamily: "'DM Mono', monospace", textTransform: "uppercase", letterSpacing: "0.1em" }}>
            Thời gian hiện tại
          </span>
          <span style={{ fontSize: 18, fontWeight: 700, color: "#9b59f7", fontFamily: "'DM Mono', monospace", letterSpacing: "0.05em" }}>
            {millisecondsToHuman(timer.elapsed)}
          </span>
        </div>

        <TimerForm
          initialTitle={timer.title}
          initialProject={timer.project}
          onSave={handleSave}
          onCancel={goBack}
          submitLabel="✓  Lưu thay đổi"
        />
      </div>
    </div>
  );
}

const screenStyle: React.CSSProperties = {
  flex: 1,
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "center",
  paddingTop: 24,
};

const cardStyle: React.CSSProperties = {
  width: "100%",
  background: "#16162a",
  borderRadius: 16,
  padding: "24px 20px",
  border: "1px solid #1e1e32",
};

const screenTitleStyle: React.CSSProperties = {
  fontSize: 18,
  fontWeight: 700,
  color: "#e8e6ff",
  fontFamily: "'DM Mono', monospace",
  marginBottom: 20,
};

// ════════════════════════════════════════════════
// HOME SCREEN  (app/index.tsx)
// ════════════════════════════════════════════════
type HomeScreenProps = {
  timers: Timer[];
  setTimers: React.Dispatch<React.SetStateAction<Timer[]>>;
  navigate: (screen: Screen, params?: { timer?: Timer }) => void;
};

function HomeScreen({ timers, setTimers, navigate }: HomeScreenProps) {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimers((prev) =>
        prev.map((t) => (t.isRunning ? { ...t, elapsed: t.elapsed + 1000 } : t))
      );
    }, 1000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  const handleStartStop = (id: string) =>
    setTimers((prev) => prev.map((t) => (t.id === id ? { ...t, isRunning: !t.isRunning } : t)));

  const handleDelete = (id: string) =>
    setTimers((prev) => prev.filter((t) => t.id !== id));

  const handleEdit = (id: string, title: string, project: string) =>
    setTimers((prev) => prev.map((t) => (t.id === id ? { ...t, title, project } : t)));

  const totalElapsed = timers.reduce((sum, t) => sum + t.elapsed, 0);
  const runningCount = timers.filter((t) => t.isRunning).length;

  return (
    <div>
      {/* Stats row */}
      <div style={{ display: "flex", gap: 10, marginBottom: 18 }}>
        {[
          { label: "Tổng", value: millisecondsToHuman(totalElapsed), accent: false },
          { label: "Đang chạy", value: String(runningCount), accent: runningCount > 0 },
          { label: "Timers", value: String(timers.length), accent: false },
        ].map(({ label, value, accent }) => (
          <div key={label} style={{
            flex: 1,
            background: "#16162a",
            borderRadius: 10,
            padding: "10px 12px",
            border: `1px solid ${accent ? "#2e3a5e" : "#1e1e32"}`,
          }}>
            <div style={{ fontSize: 9, color: "#5a5a7a", textTransform: "uppercase", letterSpacing: "0.12em", fontFamily: "'DM Mono', monospace", marginBottom: 3 }}>{label}</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: accent ? "#4f8ef7" : "#7b7aaa", fontFamily: "'DM Mono', monospace" }}>{value}</div>
          </div>
        ))}
      </div>

      {/* ToggleableTimerForm — tạo nhanh không cần navigate */}
      <ToggleableTimerForm
        onSave={(title, project) => {
          setTimers((prev) => [{ id: Date.now().toString(), title, project, elapsed: 0, isRunning: false }, ...prev]);
        }}
      />

      {/* FlatList — dùng Array.map thay thế FlatList của RN */}
      {timers.length === 0 ? (
        <div style={{ textAlign: "center", padding: "50px 0", color: "#3a3a55", fontFamily: "'DM Mono', monospace" }}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>⏱</div>
          <div style={{ fontSize: 13 }}>Chưa có timer nào.<br />Nhấn "+ TIMER MỚI" để bắt đầu.</div>
        </div>
      ) : (
        timers.map((timer) => (
          <EditableTimer
            key={timer.id}
            {...timer}
            onStartStop={handleStartStop}
            onDelete={handleDelete}
            onEdit={handleEdit}
            onEditStart={() => navigate("EditTimer", { timer })}
          />
        ))
      )}

      {/* Nút "Thêm Timer" điều hướng sang CreateTimerScreen */}
      <button
        onClick={() => navigate("CreateTimer")}
        style={{
          width: "100%",
          marginTop: 8,
          padding: "15px",
          background: "#4f8ef7",
          border: "none",
          borderRadius: 14,
          color: "#fff",
          fontFamily: "'DM Mono', monospace",
          fontWeight: 700,
          fontSize: 14,
          letterSpacing: "0.05em",
          cursor: "pointer",
          transition: "filter 0.15s",
        }}
        onMouseEnter={(e) => ((e.target as HTMLButtonElement).style.filter = "brightness(1.15)")}
        onMouseLeave={(e) => ((e.target as HTMLButtonElement).style.filter = "brightness(1)")}
      >
        + Thêm Timer
      </button>
    </div>
  );
}

// ════════════════════════════════════════════════
// _LAYOUT  (app/_layout.tsx) — Navigation root
// ════════════════════════════════════════════════
export default function Layout() {
  const [timers, setTimers] = useState<Timer[]>([
    { id: "1", title: "Thiết kế UI", project: "Dự án Alpha", elapsed: 4215000, isRunning: false },
    { id: "2", title: "Lên kế hoạch Sprint", project: "Agile Q2", elapsed: 900000, isRunning: false },
  ]);

  const [nav, setNav] = useState<NavigationState>({ screen: "Home" });

  const navigate = (screen: Screen, params?: { timer?: Timer }) =>
    setNav({ screen, params });

  const goBack = () => setNav({ screen: "Home" });

  const screenTitles: Record<Screen, string> = {
    Home: "Time Tracker",
    CreateTimer: "Tạo Timer Mới",
    EditTimer: "Chỉnh Sửa Timer",
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0c0c18; }
        @keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: #2a2a3a; border-radius: 4px; }
      `}</style>

      <div style={{
        minHeight: "100vh",
        background: "#0c0c18",
        display: "flex",
        justifyContent: "center",
        fontFamily: "'DM Mono', monospace",
      }}>
        <div style={{ width: "100%", maxWidth: 480, display: "flex", flexDirection: "column" }}>

          {/* Header / Navigation Bar */}
          <div style={{
            padding: "20px 20px 16px",
            borderBottom: "1px solid #1a1a2e",
            position: "sticky",
            top: 0,
            background: "#0c0c18",
            zIndex: 10,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}>
            {nav.screen !== "Home" && (
              <button
                onClick={goBack}
                style={{
                  background: "none",
                  border: "none",
                  color: "#4f8ef7",
                  cursor: "pointer",
                  fontSize: 18,
                  padding: "0 4px",
                  lineHeight: 1,
                }}
              >
                ←
              </button>
            )}
            <div>
              {nav.screen === "Home" && (
                <div style={{ fontSize: 10, color: "#4f8ef7", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 2 }}>
                  Mobile Programming
                </div>
              )}
              <h1 style={{ fontSize: 20, fontWeight: 700, color: "#e8e6ff", letterSpacing: "-0.01em" }}>
                {screenTitles[nav.screen]}
              </h1>
            </div>
          </div>

          {/* Screen content */}
          <div style={{ padding: "20px", flex: 1, overflowY: "auto" }}>
            {nav.screen === "Home" && (
              <HomeScreen timers={timers} setTimers={setTimers} navigate={navigate} />
            )}
            {nav.screen === "CreateTimer" && (
              <CreateTimerScreen timers={timers} setTimers={setTimers} goBack={goBack} />
            )}
            {nav.screen === "EditTimer" && nav.params?.timer && (
              <EditTimerScreen
                timer={nav.params.timer}
                timers={timers}
                setTimers={setTimers}
                goBack={goBack}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}