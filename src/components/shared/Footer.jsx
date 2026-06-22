import {
  ArrowUpRight,
  BriefcaseBusiness,
  Mail,
  MapPin,
  Rocket,
} from "lucide-react";

import Image from "next/image";
import Link from "next/link";

import {
  LogoGithub,
  LogoLinkedin,
  Aperture,
} from "@gravity-ui/icons";

const footerLinks = [
  {
    title: "Platform",
    links: [
      {
        label: "Browse Startups",
        href: "/startups",
      },
      {
        label: "Opportunities",
        href: "/opportunities",
      },
      {
        label: "Founder Stories",
        href: "/stories",
      },
      {
        label: "Investor Network",
        href: "/investors",
      },
    ],
  },
  {
    title: "Company",
    links: [
      {
        label: "About",
        href: "/about",
      },
      {
        label: "Contact",
        href: "/contact",
      },
      {
        label: "Careers",
        href: "/careers",
      },
      {
        label: "Terms",
        href: "/terms",
      },
    ],
  },
];

const socials = [
  {
    label: "GitHub",
    href: "https://github.com",
    icon: LogoGithub,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: LogoLinkedin,
  },
  {
    label: "Twitter",
    href: "https://twitter.com",
    icon: Aperture,
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#15173D] text-white">
      {/* Background Glow */}
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-brand-primary/20 blur-[120px]" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-[#E491C9]/10 blur-[120px]" />

      <div className="container relative mx-auto px-4 py-20">
        {/* Newsletter */}
        <div className="mb-16 rounded-4xl bg-linear-to-r from-brand-primary via-[#E491C9] to-brand-primary p-px">
          <div className="rounded-[31px] bg-[#15173D] p-8 md:p-10">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-3xl font-bold">
                  Stay Updated With Startup Opportunities
                </h2>

                <p className="mt-3 max-w-xl text-white/70">
                  Discover startup jobs, founder stories,
                  funding updates, and exclusive opportunities.
                </p>
              </div>

              <div className="flex w-full max-w-md gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="h-12 flex-1 rounded-full border border-white/10 bg-white/5 px-5 outline-none backdrop-blur-xl transition focus:border-[#E491C9]"
                />

                <button className="rounded-full bg-brand-primary px-6 font-semibold transition hover:bg-[#851f85]">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer */}
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="flex items-center gap-4"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-brand-primary to-[#E491C9] shadow-xl">
                <Image
                  src="/logo.png"
                  alt="StartupForge"
                  width={48}
                  height={48}
                />
              </div>

              <span className="bg-linear-to-r from-white to-[#E491C9] bg-clip-text text-4xl font-extrabold text-transparent">
                StartupForge
              </span>
            </Link>

            <p className="mt-6 max-w-md leading-7 text-white/60">
              Connect with innovative founders,
              discover exciting startup opportunities,
              and build the future together.
            </p>

            <div className="mt-8 space-y-4 text-sm">
              <div className="flex items-center gap-3 text-white/70">
                <MapPin
                  size={18}
                  className="text-[#E491C9]"
                />
                Dhaka, Bangladesh
              </div>

              <a
                href="mailto:hello@startupforge.com"
                className="flex items-center gap-3 text-white/70 transition hover:text-white"
              >
                <Mail
                  size={18}
                  className="text-[#E491C9]"
                />
                hello@startupforge.com
              </a>
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h3 className="mb-6 text-sm font-bold uppercase tracking-[0.2em] text-[#E491C9]">
                {group.title}
              </h3>

              <ul className="space-y-4">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-2 text-white/60 transition hover:text-white"
                    >
                      <span className="transition group-hover:translate-x-1">
                        {link.label}
                      </span>

                      <ArrowUpRight
                        size={14}
                        className="opacity-0 transition group-hover:opacity-100"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 rounded-4xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="flex items-center gap-3 text-xl font-bold">
                <Rocket
                  size={22}
                  className="text-[#E491C9]"
                />

                Ready to launch your startup journey?
              </div>

              <p className="mt-3 text-white/60">
                Join StartupForge today and connect with
                ambitious founders and talented builders.
              </p>
            </div>

            <Link
              href="/register"
              className="inline-flex h-12 items-center justify-center rounded-full bg-brand-primary px-8 font-semibold transition hover:bg-[#851f85]"
            >
              Get Started
            </Link>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col gap-5 border-t border-brand-primary/20 pt-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2 text-sm text-white/50">
            <BriefcaseBusiness size={16} />
            © 2026 StartupForge. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all duration-300 hover:-translate-y-1 hover:border-[#E491C9] hover:bg-brand-primary"
              >
                <social.icon />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}