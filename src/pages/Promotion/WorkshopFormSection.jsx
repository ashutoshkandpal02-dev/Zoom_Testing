import React, { useEffect } from 'react';
import { Sparkles, Gift, ArrowRight } from 'lucide-react';

const WorkshopFormSection = () => {
  useEffect(() => {
    if (document.querySelector('script[src*="wonderengine.ai/js/form_embed"]')) return;
    const script = document.createElement("script");
    script.src = "https://api.wonderengine.ai/js/form_embed.js";
    script.async = true;
    script.onerror = () => { };
    document.body.appendChild(script);
  }, []);

  return (
    <section
      id="workshop-register-form"
      className="relative py-24 overflow-hidden scroll-mt-20"
      style={{ fontFamily: 'Inter, sans-serif' }}
    >
      {/* Background Image - Education/Workshop themed */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&q=80)`,
        }}
      />
      {/* Dark Overlay - ensures text readability */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: 'linear-gradient(160deg, rgba(15, 23, 42, 0.92) 0%, rgba(30, 64, 175, 0.88) 30%, rgba(37, 99, 235, 0.85) 60%, rgba(59, 130, 246, 0.9) 100%)',
        }}
      />
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(251,191,36,0.08)_0%,transparent_50%)]" />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.06)_0%,transparent_50%)]" />
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-amber-400/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-blue-400/10 blur-[100px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">

          {/* LEFT: Catchy Copy */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-400/20 border border-amber-400/30 mb-8">
              <Gift className="w-4 h-4 text-amber-300" />
              <span className="text-sm font-bold text-amber-200 uppercase tracking-wider">Free Workshop</span>
            </div>

            <h2
              style={{
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontSize: 'clamp(36px, 4.5vw, 52px)',
                fontWeight: 400,
                letterSpacing: '-1.5px',
                lineHeight: '1.15',
                color: '#ffffff',
                textShadow: '0 4px 30px rgba(0,0,0,0.2)'
              }}
              className="mb-6"
            >
              Your Next Career Move <br />
              <span style={{ color: '#fbbf24' }}>Starts Here.</span>
            </h2>

            <p
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '18px',
                fontWeight: 400,
                lineHeight: '1.7',
                color: 'rgba(255, 255, 255, 0.9)'
              }}
              className="mb-8 max-w-lg"
            >
              Join 100+ instructional designers who are already transforming their careers.
              <span className="font-semibold text-amber-200"> One form. One workshop. One life-changing opportunity.</span>
            </p>

            <ul className="space-y-4 mb-10">
              {[
                "✓ Instant confirmation — no spam, ever",
                "✓ Exclusive AI toolkit access upon registration",
                "✓ Limited spots — 21 March · 7 PM PST"
              ].map((item, i) => (
                <li
                  key={i}
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '16px',
                    fontWeight: 500,
                    color: 'rgba(255, 255, 255, 0.95)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}
                  className="justify-center lg:justify-start"
                >
                  <ArrowRight className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-3 justify-center lg:justify-start">
              <Sparkles className="w-5 h-5 text-amber-300" />
              <span
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: 'rgba(255, 255, 255, 0.9)'
                }}
              >
                Reserve your seat in under 30 seconds
              </span>
            </div>
          </div>

          {/* RIGHT: Form Card */}
          <div className="flex-1 w-full max-w-[550px]">
            <div
              className="relative overflow-hidden rounded-[2.5rem] p-8 shadow-2xl"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.06) 100%)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.25)',
                boxShadow: '0 25px 50px -12px rgba(0,0,0,0.35)'
              }}
            >
              {/* Form Header */}
              <div className="text-center mb-6">
                <h3
                  style={{
                    fontFamily: 'Georgia, "Times New Roman", serif',
                    fontSize: 'clamp(24px, 2.8vw, 30px)',
                    fontWeight: 400,
                    color: '#ffffff',
                    lineHeight: '1.2'
                  }}
                >
                  Claim Your Free Seat
                </h3>
                <p
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '14px',
                    fontWeight: 500,
                    color: 'rgba(255, 255, 255, 0.9)',
                    marginTop: '8px'
                  }}
                >
                  Limited spots · Join the waitlist now
                </p>
              </div>

              {/* WonderEngine Form */}
              <div className="min-h-[420px] rounded-2xl overflow-hidden bg-white/5 border border-white/10">
                <iframe
                  src="https://api.wonderengine.ai/widget/form/shMcFJTlAwWtTgL3brwz"
                  style={{ width: '100%', height: '100%', minHeight: '400px', border: 'none', borderRadius: '16px' }}
                  id="workshop-form-shMcFJTlAwWtTgL3brwz"
                  data-layout="{'id':'INLINE'}"
                  data-trigger-type="alwaysShow"
                  data-trigger-value=""
                  data-activation-type="alwaysActivated"
                  data-activation-value=""
                  data-deactivation-type="neverDeactivate"
                  data-deactivation-value=""
                  data-form-name="Affiliate Marketing Agency Lead"
                  data-height="undefined"
                  data-layout-iframe-id="workshop-form-shMcFJTlAwWtTgL3brwz"
                  data-form-id="shMcFJTlAwWtTgL3brwz"
                  title="Workshop Registration"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkshopFormSection;

