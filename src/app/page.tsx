"use client";

import dynamic from "next/dynamic";
import GlitchName from "@/components/GlitchName";
import Noise from "@/components/Noise";
import Cursor from "@/components/Cursor";
import { profile, roles, stacks, works } from "@/data/portfolio";

// R3F는 SSR 불가 — dynamic import로 클라이언트 전용 로드
const NoiseField = dynamic(() => import("@/components/NoiseField"), { ssr: false });

// ===================================================================
// 로컬 컴포넌트
// ===================================================================

// 소형 레이블
function Label({ children, color }: { children: React.ReactNode; color?: string }) {
  return (
    <span
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: "15px",
        letterSpacing: "0.18em",
        color: color ?? "var(--color-dim)",
        textTransform: "uppercase" as const,
      }}
    >
      {children}
    </span>
  );
}

// 구분선 — 선택적으로 그라디언트 적용
function Divider({ gradient }: { gradient?: boolean }) {
  return (
    <div
      style={{
        width: "100%",
        height: "1px",
        background: gradient
          ? "var(--grad-line)"
          : "var(--color-line)",
        opacity: gradient ? 0.6 : 1,
      }}
    />
  );
}

// 태그 배지
function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: "13px",
        letterSpacing: "0.2em",
        color: "var(--color-accent)",
        border: "1px solid var(--color-accent)",
        padding: "5px 12px",
        flexShrink: 0,
        opacity: 0.85,
      }}
    >
      {children}
    </span>
  );
}

// ===================================================================
// 메인 페이지
// ===================================================================
export default function Home() {
  return (
    <>
      <Cursor />
      <Noise />
      <NoiseField />

      <main
        style={{
          position: "relative",
          zIndex: 1,
          minHeight: "100dvh",
          color: "var(--color-fg)",
          overflowX: "hidden",
        }}
      >
        {/* ── 고정 네비 ── */}
        <nav
          className="animate-fade-in"
          style={{
            position: "fixed",
            top: 0, left: 0, right: 0,
            zIndex: 100,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "22px 48px",
            borderBottom: "1px solid var(--color-line)",
            background: "rgba(6,6,10,0.75)",
            backdropFilter: "blur(18px)",
            animationDelay: "0.1s",
          }}
        >
          <Label color="var(--color-teal)">BAMGASIJM.DEV</Label>
          <div style={{ display: "flex", gap: "40px" }}>
            {(["WORK", "STACK", "CONTACT"] as const).map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "15px",
                  letterSpacing: "0.18em",
                  color: "var(--color-dim)",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) =>
                  ((e.target as HTMLElement).style.color = "var(--color-accent)")
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
            paddingTop: "160px",
            paddingBottom: "100px",
            paddingLeft: "clamp(28px, 6vw, 96px)",
            paddingRight: "clamp(28px, 6vw, 96px)",
          }}
        >
          {/* 상태 표시 */}
          <div
            className="animate-fade-up"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "40px",
              animationDelay: "0.2s",
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                background: "var(--color-teal)",
                display: "inline-block",
                boxShadow: "0 0 8px var(--color-teal)",
                animation: "blink 1.6s ease-in-out infinite",
              }}
            />
            <Label color="var(--color-teal)">
              AVAILABLE FOR WORK — SEOUL, KR — {profile.year}
            </Label>
          </div>

          {/* 글리치 타이틀 */}
          <div className="animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <GlitchName text={profile.name} />
          </div>

          {/* 역할 한 줄 */}
          <p
            className="animate-fade-up"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "clamp(18px, 2.2vw, 28px)",
              letterSpacing: "0.1em",
              color: "var(--color-dim)",
              marginTop: "28px",
              animationDelay: "0.45s",
            }}
          >
            {profile.tagline}
          </p>

          {/* 역할 테이블 */}
          <div
            className="animate-fade-up"
            style={{
              marginTop: "64px",
              maxWidth: 720,
              animationDelay: "0.55s",
            }}
          >
            {roles.map((r, i) => (
              <div key={i}>
                <Divider gradient={i === 0} />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "18px 0",
                    gap: "16px",
                  }}
                >
                  <Label>{r.label}</Label>
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "20px",
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

          {/* 바이오 */}
          <p
            className="animate-fade-up"
            style={{
              marginTop: "56px",
              maxWidth: 540,
              fontFamily: "var(--font-body)",
              fontSize: "18px",
              fontWeight: 300,
              lineHeight: 1.85,
              color: "rgba(238,234,227,0.55)",
              animationDelay: "0.65s",
            }}
          >
            {profile.bio}
          </p>
        </section>

        {/* ── 스택 섹션 ── */}
        <section
          id="stack"
          style={{
            padding: "96px clamp(28px, 6vw, 96px)",
            borderTop: "1px solid var(--color-line)",
          }}
        >
          {/* 섹션 헤더 */}
          <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "48px" }}>
            <span
              style={{
                width: 3,
                height: 32,
                background: "var(--grad-line)",
                display: "inline-block",
              }}
            />
            <Label color="var(--color-fg)">TECH STACK</Label>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: "0",
            }}
          >
            {stacks.map((s, si) => (
              <div
                key={si}
                style={{
                  padding: "36px 0",
                  paddingRight: "48px",
                  borderBottom: "1px solid var(--color-line)",
                  borderRight: si % 2 === 0 ? "1px solid var(--color-line)" : "none",
                }}
              >
                <Label color="var(--color-accent)">{s.category}</Label>
                <ul
                  style={{
                    listStyle: "none",
                    marginTop: "20px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  {s.items.map((item, ii) => (
                    <li
                      key={ii}
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "18px",
                        fontWeight: 300,
                        color: "var(--color-fg)",
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                      }}
                    >
                      <span
                        style={{
                          width: 4,
                          height: 4,
                          background: "var(--color-teal)",
                          boxShadow: "0 0 6px var(--color-teal)",
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

        {/* ── 작업 섹션 ── */}
        <section
          id="work"
          style={{
            padding: "96px clamp(28px, 6vw, 96px)",
            borderTop: "1px solid var(--color-line)",
          }}
        >
          {/* 섹션 헤더 */}
          <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "48px" }}>
            <span
              style={{
                width: 3,
                height: 32,
                background: "var(--grad-line)",
                display: "inline-block",
              }}
            />
            <Label color="var(--color-fg)">SELECTED WORK</Label>
          </div>

          <div>
            {works.map((w, i) => (
              <div key={i}>
                <Divider />
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "26px 0",
                    gap: "20px",
                    cursor: "crosshair",
                    transition: "padding-left 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.paddingLeft = "16px";
                    el.style.borderLeft = "3px solid var(--color-accent)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.paddingLeft = "0";
                    el.style.borderLeft = "none";
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "28px" }}>
                    <Label color="var(--color-teal)">{w.year}</Label>
                    <span
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "clamp(18px, 2vw, 26px)",
                        fontWeight: 300,
                      }}
                    >
                      {w.title}
                    </span>
                  </div>
                  <Tag>{w.tag}</Tag>
                </div>
              </div>
            ))}
            <Divider gradient />
          </div>
        </section>

        {/* ── 푸터 ── */}
        <footer
          id="contact"
          style={{
            padding: "72px clamp(28px, 6vw, 96px)",
            borderTop: "1px solid var(--color-line)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            flexWrap: "wrap",
            gap: "40px",
          }}
        >
          <div>
            <Label color="var(--color-fg)">CONTACT</Label>
            <div style={{ marginTop: "20px", display: "flex", gap: "36px" }}>
              {(["GITHUB", "EMAIL", "INSTAGRAM"] as const).map((link) => (
                <a
                  key={link}
                  href="#"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "16px",
                    letterSpacing: "0.14em",
                    color: "var(--color-dim)",
                    textDecoration: "none",
                    transition: "color 0.2s",
                    position: "relative",
                  }}
                  onMouseEnter={(e) =>
                    ((e.target as HTMLElement).style.color = "var(--color-teal)")
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
