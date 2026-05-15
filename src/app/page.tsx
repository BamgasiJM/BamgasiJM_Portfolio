"use client";

import GlitchName from "@/components/GlitchName";
import Noise from "@/components/Noise";
import Cursor from "@/components/Cursor";
import { profile, roles, stacks, works } from "@/data/portfolio";

// ===================================================================
// 작은 레이블 컴포넌트
// ===================================================================
function Label({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: "13px",
        letterSpacing: "0.15em",
        color: "var(--color-dim)",
      }}
    >
      {children}
    </span>
  );
}

// 구분선
function Divider() {
  return (
    <div
      style={{
        width: "100%",
        height: "1px",
        background: "var(--color-line)",
      }}
    />
  );
}

// ===================================================================
// 페이지 본체
// ===================================================================
export default function Home() {
  return (
    <>
      <Cursor />
      <Noise />

      <main
        style={{
          minHeight: "100dvh",
          background: "var(--color-bg)",
          color: "var(--color-fg)",
          overflowX: "hidden",
        }}
      >
        {/* ── 상단 네비 ── */}
        <nav
          className="animate-fade-in"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 100,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "20px 40px",
            borderBottom: "1px solid var(--color-line)",
            background: "rgba(8,8,8,0.85)",
            backdropFilter: "blur(12px)",
            animationDelay: "0.1s",
          }}
        >
          <Label>BAMGASIJM.DEV</Label>
          <div style={{ display: "flex", gap: "32px" }}>
            {["WORK", "STACK", "CONTACT"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "13px",
                  letterSpacing: "0.15em",
                  color: "var(--color-dim)",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) =>
                  ((e.target as HTMLElement).style.color = "var(--color-fg)")
                }
                onMouseLeave={(e) =>
                  ((e.target as HTMLElement).style.color = "var(--color-dim)")
                }
              >
                {item}
              </a>
            ))}
          </div>
        </nav>

        {/* ── 히어로 섹션 ── */}
        <section
          style={{
            paddingTop: "140px",
            paddingBottom: "80px",
            paddingLeft: "clamp(24px, 5vw, 80px)",
            paddingRight: "clamp(24px, 5vw, 80px)",
          }}
        >
          {/* 상태 표시 */}
          <div
            className="animate-fade-up"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "32px",
              animationDelay: "0.2s",
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                background: "var(--color-accent)",
                display: "inline-block",
                animation: "blink 1.6s ease-in-out infinite",
              }}
            />
            <Label>AVAILABLE FOR WORK — SEOUL, KR — {profile.year}</Label>
          </div>

          {/* 글리치 타이틀 */}
          <div className="animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <GlitchName text={profile.name} />
          </div>

          {/* 서브 태그라인 */}
          <p
            className="animate-fade-up"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "clamp(14px, 1.8vw, 18px)",
              letterSpacing: "0.1em",
              color: "var(--color-dim)",
              marginTop: "24px",
              animationDelay: "0.45s",
            }}
          >
            {profile.tagline}
          </p>

          {/* 역할 테이블 */}
          <div
            className="animate-fade-up"
            style={{
              marginTop: "56px",
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: 0,
              maxWidth: 640,
              animationDelay: "0.55s",
            }}
          >
            {roles.map((r, i) => (
              <div key={i}>
                <Divider />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "14px 0",
                    gap: "16px",
                  }}
                >
                  <Label>{r.label}</Label>
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "16px",
                      fontWeight: 300,
                      letterSpacing: "0.02em",
                      textAlign: "right",
                    }}
                  >
                    {r.value}
                  </span>
                </div>
              </div>
            ))}
            <Divider />
          </div>

          {/* 바이오 텍스트 */}
          <p
            className="animate-fade-up"
            style={{
              marginTop: "48px",
              maxWidth: 480,
              fontFamily: "var(--font-body)",
              fontSize: "16px",
              fontWeight: 300,
              lineHeight: 1.8,
              color: "rgba(240,237,232,0.6)",
              animationDelay: "0.65s",
            }}
          >
            {profile.bio}
          </p>
        </section>

        {/* ── 기술 스택 섹션 ── */}
        <section
          id="stack"
          style={{
            padding: "80px clamp(24px, 5vw, 80px)",
            borderTop: "1px solid var(--color-line)",
          }}
        >
          <Label>STACK</Label>

          <div
            style={{
              marginTop: "40px",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: "0",
            }}
          >
            {stacks.map((s, si) => (
              <div
                key={si}
                style={{
                  padding: "32px 0",
                  paddingRight: "40px",
                  borderBottom: "1px solid var(--color-line)",
                  borderRight:
                    si % 2 === 0 ? "1px solid var(--color-line)" : "none",
                }}
              >
                <Label>{s.category}</Label>
                <ul
                  style={{
                    listStyle: "none",
                    marginTop: "16px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  {s.items.map((item, ii) => (
                    <li
                      key={ii}
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "15px",
                        fontWeight: 300,
                        color: "var(--color-fg)",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <span
                        style={{
                          width: 3,
                          height: 3,
                          background: "var(--color-accent)",
                          display: "inline-block",
                          flexShrink: 0,
                        }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ── 작업 목록 섹션 ── */}
        <section
          id="work"
          style={{
            padding: "80px clamp(24px, 5vw, 80px)",
            borderTop: "1px solid var(--color-line)",
          }}
        >
          <Label>SELECTED WORK</Label>

          <div style={{ marginTop: "40px" }}>
            {works.map((w, i) => (
              <div key={i}>
                <Divider />
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "20px 0",
                    gap: "16px",
                    cursor: "crosshair",
                    transition: "background 0.15s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.paddingLeft = "12px";
                    (e.currentTarget as HTMLElement).style.transition =
                      "padding 0.2s, background 0.2s";
                    (e.currentTarget as HTMLElement).style.borderLeft =
                      "2px solid var(--color-accent)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.paddingLeft = "0";
                    (e.currentTarget as HTMLElement).style.borderLeft = "none";
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "24px",
                    }}
                  >
                    <Label>{w.year}</Label>
                    <span
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "clamp(15px, 1.8vw, 20px)",
                        fontWeight: 300,
                      }}
                    >
                      {w.title}
                    </span>
                  </div>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "11px",
                      letterSpacing: "0.2em",
                      color: "var(--color-dim)",
                      border: "1px solid var(--color-line)",
                      padding: "4px 8px",
                      flexShrink: 0,
                    }}
                  >
                    {w.tag}
                  </span>
                </div>
              </div>
            ))}
            <Divider />
          </div>
        </section>

        {/* ── 푸터 / 컨택 ── */}
        <footer
          id="contact"
          style={{
            padding: "60px clamp(24px, 5vw, 80px)",
            borderTop: "1px solid var(--color-line)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            flexWrap: "wrap",
            gap: "32px",
          }}
        >
          <div>
            <Label>CONTACT</Label>
            <div style={{ marginTop: "16px", display: "flex", gap: "32px" }}>
              {["GITHUB", "EMAIL", "INSTAGRAM"].map((link) => (
                <a
                  key={link}
                  href="#"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "13px",
                    letterSpacing: "0.12em",
                    color: "var(--color-dim)",
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    ((e.target as HTMLElement).style.color =
                      "var(--color-accent)")
                  }
                  onMouseLeave={(e) =>
                    ((e.target as HTMLElement).style.color = "var(--color-dim)")
                  }
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
          <Label>© {profile.year} BAMGASIJM — ALL RIGHTS RESERVED</Label>
        </footer>
      </main>
    </>
  );
}
