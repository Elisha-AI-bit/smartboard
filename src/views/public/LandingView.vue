<template>
  <div class="landing-page bg-mesh min-h-screen">
    <!-- Navigation -->
    <nav class="landing-nav glass flex justify-between items-center px-12 py-4 sticky top-0 z-50">
      <div class="flex items-center gap-3">
        <div class="logo-box">S</div>
        <span class="logo-text">SmartBoard</span>
      </div>
      <div class="flex gap-8 items-center text-sm font-medium">
        <a href="#features" class="nav-link">Features</a>
        <a href="#about" class="nav-link">About</a>
        <a href="#pricing" class="nav-link">Pricing</a>
        <router-link to="/login" class="btn btn-outline btn-sm">Sign In</router-link>
        <button @click="$router.push('/register')" class="btn btn-primary btn-sm">Request Demo</button>
      </div>
    </nav>

    <!-- Hero Section -->
    <header class="hero-section px-12 py-24 text-center max-w-4xl mx-auto">
      <div class="animate-fade-in">
        <span class="badge badge-indigo mb-6">Zambia's #1 Board Management System</span>
        <h1 class="hero-title mb-6 leading-tight">
          Elevate Governance with <span class="gradient-text">AI Insights</span>
        </h1>
        <p class="text-xl text-muted mb-10 leading-relaxed max-w-2xl mx-auto">
          Secure, localized, and intelligent. Empowering Zambian boards with seamless collaboration and strategic excellence.
        </p>
        <div class="flex justify-center gap-4">
          <button @click="$router.push('/register')" class="btn btn-primary btn-lg">Get Started for Free</button>
          <button class="btn btn-outline btn-lg">Our Success Stories</button>
        </div>
      </div>
    </header>

    <!-- Features Section -->
    <section id="features" class="px-12 py-24">
      <div class="grid grid-cols-3 gap-8">
        <div class="card glass animate-fade-in animation-delay-200">
          <div class="icon-box bg-cyan">
            <CalendarIcon :size="24" />
          </div>
          <h3 class="text-xl font-bold mb-4">Board Management</h3>
          <p class="text-muted text-sm leading-relaxed">Streamline meeting scheduling, attendance, and agenda building with Zambian compliance standards.</p>
        </div>
        <div class="card glass animate-fade-in animation-delay-400">
          <div class="icon-box bg-indigo">
            <TargetIcon :size="24" />
          </div>
          <h3 class="text-xl font-bold mb-4">Strategic Execution</h3>
          <p class="text-muted text-sm leading-relaxed">Align organizational goals (OKRs/KPIs) with board decisions using real-time progress tracking.</p>
        </div>
        <div class="card glass animate-fade-in animation-delay-400">
          <div class="icon-box bg-emerald">
            <SparklesIcon :size="24" />
          </div>
          <h3 class="text-xl font-bold mb-4">AI Insight Engine</h3>
          <p class="text-muted text-sm leading-relaxed">Predict risks, summarize documents, and receive strategic recommendations powered by board-level AI.</p>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer py-16 px-12">
      <div class="grid grid-cols-4 gap-12 mb-12">
        <div class="col-span-1">
          <div class="flex items-center gap-3 mb-6">
            <div class="logo-box small">S</div>
            <span class="logo-text">SmartBoard</span>
          </div>
          <p class="text-muted text-sm">Leading the digital transformation of Zambian corporate governance.</p>
        </div>
        <div>
          <h4 class="text-sm font-bold mb-6 uppercase tracking-wider">Resources</h4>
          <div class="flex flex-col gap-3 text-sm">
            <a href="#" class="footer-link">Compliance Guide</a>
            <a href="#" class="footer-link">Security Audit</a>
          </div>
        </div>
        <div>
          <h4 class="text-sm font-bold mb-6 uppercase tracking-wider">Contact</h4>
          <div class="flex flex-col gap-3 text-sm text-muted">
            <span>info@smartboard.zm</span>
            <span>+260 971 000 000</span>
          </div>
        </div>
      </div>
      <div class="pt-8 border-t border-slate-200 text-center text-muted text-xs">
        &copy; 2026 SmartBoard Zambia. All Rights Reserved.
      </div>
    </footer>
  </div>
</template>

<script setup>
import { Calendar as CalendarIcon, Target as TargetIcon, Sparkles as SparklesIcon } from 'lucide-vue-next'
</script>

<style scoped>
.landing-page {
  scroll-behavior: smooth;
}

.logo-box {
  width: 40px;
  height: 40px;
  background: var(--primary);
  color: white;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  font-size: 1.25rem;
  box-shadow: 0 4px 12px var(--primary-glow);
}

.logo-box.small {
  width: 32px;
  height: 32px;
  font-size: 1rem;
}

.logo-text {
  font-family: var(--font-heading);
  font-weight: 800;
  font-size: 1.5rem;
  letter-spacing: -0.03em;
  color: var(--text-main);
}

.nav-link {
  color: var(--text-muted);
  text-decoration: none;
  transition: var(--transition);
}

.nav-link:hover {
  color: var(--primary);
}

.hero-title {
  font-size: 4rem;
  font-weight: 900;
  letter-spacing: -0.04em;
  color: var(--text-main);
}

.gradient-text {
  background: linear-gradient(135deg, var(--primary) 0%, #10b981 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-style: italic;
}

.icon-box {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  color: white;
}

.bg-cyan { background: #06b6d4; box-shadow: 0 4px 12px rgba(6, 182, 212, 0.3); }
.bg-indigo { background: #6366f1; box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3); }
.bg-emerald { background: #10b981; box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3); }

.footer-link {
  color: var(--text-muted);
  text-decoration: none;
  transition: var(--transition);
}

.footer-link:hover {
  color: var(--primary);
  padding-left: 4px;
}

.footer {
  background: rgba(255, 255, 255, 0.5);
  border-top: 1px solid var(--border);
}

@media (max-width: 768px) {
  .hero-title { font-size: 2.5rem; }
  .grid-cols-3 { grid-template-columns: 1fr; }
  .grid-cols-4 { grid-template-columns: 1fr; }
  .px-12 { padding-left: var(--space-6); padding-right: var(--space-6); }
}
</style>
