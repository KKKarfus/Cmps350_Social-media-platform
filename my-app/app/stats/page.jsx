"use client";

import { useEffect, useState } from "react";

const COLORS = {
  bg: "#f4dec9",
  bgAccent: "#fdf6f0",
  sidebar: "#FFF1E7",
  topbar: "#FFF8F5",
  border: "#efe2d7",
  primary: "#f57c00",
  primaryDark: "#df6f00",
  text: "#2C1810",
  muted: "#9C6B3C",
  cardBg: "#ffffff",
};

export default function StatsPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/stats")
      .then((res) => res.json())
      .then((data) => { setStats(data); setLoading(false); })
      .catch((err) => { setError(err.message); setLoading(false); });
  }, []);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "230px 1fr", gridTemplateRows: "auto 1fr", gridTemplateAreas: '"topbar topbar" "sidebar main"', minHeight: "100vh" }}>
      
      {/* Topbar */}
      <header style={{ gridArea: "topbar", display: "flex", justifyContent: "center", alignItems: "center", padding: "18px 32px", borderBottom: `1px solid ${COLORS.border}`, backgroundColor: COLORS.topbar }}>
        <span style={{ fontSize: "1.4rem", fontWeight: 600, color: "#e86f00", fontStyle: "italic" }}>QUGeeks</span>
      </header>

      {/* Sidebar */}
      <aside style={{ gridArea: "sidebar", backgroundColor: COLORS.sidebar, borderRight: `1px solid ${COLORS.border}`, padding: "28px 22px", display: "flex", flexDirection: "column", gap: "36px" }}>
        <div>
          <img src="../assets/images/feed-sidebar-logo.png" alt="QUGeeks" style={{ width: "220px", height: "auto", display: "block" }} onError={(e) => { e.target.style.display = "none"; }} />
        </div>
        <nav style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
          {[
            { label: "Home", href: "/feed.html", icon: "fa-regular fa-house" },
            { label: "Explore", href: "/explore.html", icon: "fa-regular fa-compass" },
            { label: "Popular", href: "/trending.html", icon: "fa-solid fa-fire" },
            { label: "Statistics", href: "/stats", icon: "fa-solid fa-chart-bar", active: true },
            { label: "Profile", href: "/profile.html", icon: "fa-regular fa-circle-user" },
          ].map((link) => (
            <a key={link.label} href={link.href} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 10px 12px 12px", color: link.active ? "#c86412" : "#5d4334", textDecoration: "none", borderLeft: link.active ? "3px solid #f57c00" : "3px solid transparent", backgroundColor: link.active ? COLORS.bg : "transparent", borderRadius: link.active ? "8%" : "0", fontWeight: link.active ? 600 : 400, fontSize: "1rem", transition: "color 0.2s ease" }}>
              <i className={link.icon} style={{ fontSize: "1rem", width: "16px" }}></i>
              {link.label}
            </a>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <main style={{ gridArea: "main", backgroundColor: "#FFFCF9", padding: "36px 48px 60px", overflowY: "auto" }}>
        
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          {/* Page Header */}
          <div style={{ marginBottom: "36px" }}>
            <h1 style={{ margin: "0 0 8px", fontSize: "2.2rem", fontWeight: 700, color: COLORS.text, fontStyle: "italic" }}>
              Platform <span style={{ color: COLORS.primary }}>Statistics</span>
            </h1>
            <p style={{ margin: 0, color: "#7a6555", fontSize: "1rem", lineHeight: 1.6 }}>
              Live insights and analytics from the QUGeeks social media platform.
            </p>
          </div>

          {loading && <p style={{ color: COLORS.muted, fontSize: "1.1rem" }}>Loading statistics...</p>}
          {error && <p style={{ color: "#c0392b" }}>Error: {error}</p>}

          {stats && (
            <>
              {/* Section: Platform Overview */}
              <SectionLabel label="PLATFORM OVERVIEW" />
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "32px" }}>
                <OverviewCard value={stats.totalUsers} label="Total Users" />
                <OverviewCard value={stats.totalPosts} label="Total Posts" />
                <OverviewCard value={stats.avgPostsPerUser} label="Avg Posts / User" />
                <OverviewCard value={stats.avgFollowersPerUser} label="Avg Followers / User" />
              </div>

              {/* Section: Most Followed & Most Liked side by side */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginBottom: "32px" }}>
                
                {/* Top Followed Users */}
                <div>
                  <SectionLabel label="MOST FOLLOWED USERS" />
                  <div style={cardStyle}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                      <h3 style={{ margin: 0, fontSize: "1.1rem", fontWeight: 700, color: COLORS.text }}>Top Users</h3>
                      <span style={tagStyle}>by followers</span>
                    </div>
                    {stats.topFollowedUsers.map((user, i) => (
                      <div key={user.id} style={rowStyle}>
                        <Avatar initials={user.username.slice(0, 2).toUpperCase()} index={i} />
                        <span style={{ flex: 1, fontWeight: 500, color: COLORS.text, fontSize: "0.95rem" }}>{user.username}</span>
                        <span style={{ color: COLORS.primary, fontWeight: 700, fontSize: "0.9rem" }}>{user._count.followers}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Top Liked Posts */}
                <div>
                  <SectionLabel label="MOST LIKED POSTS" />
                  <div style={cardStyle}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                      <h3 style={{ margin: 0, fontSize: "1.1rem", fontWeight: 700, color: COLORS.text }}>Top Posts</h3>
                      <span style={tagStyle}>by likes</span>
                    </div>
                    {stats.topLikedPosts.map((post, i) => (
                      <div key={post.id} style={{ ...rowStyle, alignItems: "flex-start" }}>
                        <span style={{ minWidth: "22px", height: "22px", borderRadius: "50%", background: COLORS.primary, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem", fontWeight: 700, flexShrink: 0, marginTop: "2px" }}>{i + 1}</span>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p style={{ margin: "0 0 2px", fontSize: "0.88rem", color: COLORS.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {post.content.length > 55 ? post.content.slice(0, 55) + "..." : post.content}
                          </p>
                          <p style={{ margin: 0, fontSize: "0.78rem", color: "#8a7565" }}>
                            {post.author.username} · ❤️ {post._count.likes}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Most Active User */}
              <SectionLabel label="MOST ACTIVE USER" />
              {stats.mostActiveUser && (
                <div style={{ background: COLORS.primary, borderRadius: "16px", padding: "24px 28px", display: "flex", alignItems: "center", gap: "20px", marginBottom: "32px" }}>
                  <div style={{ width: "52px", height: "52px", borderRadius: "50%", background: "rgba(255,255,255,0.25)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem", fontWeight: 700, color: "#fff", flexShrink: 0 }}>
                    {stats.mostActiveUser.username.slice(0, 2).toUpperCase()}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ margin: "0 0 4px", fontWeight: 700, fontSize: "1.15rem", color: "#fff" }}>{stats.mostActiveUser.username}</p>
                    <p style={{ margin: 0, fontSize: "0.88rem", color: "rgba(255,255,255,0.85)" }}>
                      Most posts + comments
                    </p>
                  </div>
                  <div style={{ display: "flex", gap: "24px" }}>
                    <Pill label={`${stats.mostActiveUser._count.posts} posts`} />
                    <Pill label={`${stats.mostActiveUser._count.comments} comments`} />
                    <Pill label={`${stats.mostActiveUser._count.posts + stats.mostActiveUser._count.comments} total`} />
                  </div>
                </div>
              )}

              {/* Top Reposted Posts */}
              <SectionLabel label="MOST REPOSTED POSTS" />
              <div style={cardStyle}>
                {stats.topRepostedPosts.map((post, i) => (
                  <div key={post.id} style={{ ...rowStyle, alignItems: "flex-start" }}>
                    <span style={{ minWidth: "28px", height: "28px", borderRadius: "50%", background: i === 0 ? "#FFD700" : i === 1 ? "#C0C0C0" : i === 2 ? "#CD7F32" : "#f5e8dc", color: i < 3 ? "#5a3e00" : "#7a5c44", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.85rem", fontWeight: 700, flexShrink: 0 }}>{i + 1}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ margin: "0 0 2px", fontSize: "0.95rem", color: COLORS.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {post.content.length > 80 ? post.content.slice(0, 80) + "..." : post.content}
                      </p>
                      <p style={{ margin: 0, fontSize: "0.82rem", color: "#8a7565" }}>
                        by {post.author.username} · 🔁 {post._count.reposts} reposts
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

function SectionLabel({ label }) {
  return <p style={{ margin: "0 0 12px", fontSize: "0.75rem", fontWeight: 600, color: "#9C6B3C", letterSpacing: "0.1em", textTransform: "uppercase" }}>{label}</p>;
}

function OverviewCard({ value, label }) {
  return (
    <div style={{ background: "#ffffff", border: "1px solid #f0e4da", borderRadius: "14px", padding: "20px", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
      <p style={{ margin: "0 0 4px", fontSize: "2rem", fontWeight: 700, color: "#f57c00" }}>{value}</p>
      <p style={{ margin: 0, fontSize: "0.85rem", color: "#7a6555" }}>{label}</p>
    </div>
  );
}

function Avatar({ initials, index }) {
  const colors = ["#e86f00", "#c0392b", "#2980b9", "#27ae60", "#8e44ad"];
  return (
    <div style={{ width: "34px", height: "34px", borderRadius: "50%", background: colors[index % colors.length], color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.78rem", fontWeight: 700, flexShrink: 0 }}>
      {initials}
    </div>
  );
}

function Pill({ label }) {
  return <span style={{ background: "rgba(255,255,255,0.2)", color: "#fff", padding: "4px 12px", borderRadius: "999px", fontSize: "0.82rem", fontWeight: 500 }}>{label}</span>;
}

const cardStyle = {
  background: "#ffffff",
  border: "1px solid #f0e4da",
  borderRadius: "14px",
  padding: "20px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
  marginBottom: "32px",
};

const rowStyle = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  padding: "10px 0",
  borderBottom: "1px solid #f5ede6",
};

const tagStyle = {
  background: "#f57c00",
  color: "#fff",
  padding: "2px 10px",
  borderRadius: "999px",
  fontSize: "0.75rem",
  fontWeight: 600,
};