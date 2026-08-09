import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  FiX,
  FiCheckCircle,
  FiTag,
  FiAward,
  FiChevronRight,
  FiTarget,
  FiBookOpen,
  FiBarChart2,
  FiArrowRight,
  FiArrowLeft,
} from "react-icons/fi";
import { projects } from "../data/portfolioData";
import { SectionHeading } from "./SectionHeading";

const CATEGORIES = [
  "All",
  "Financial Analysis",
  "Budgeting & Planning",
  "Taxation",
  "Cost Accounting",
  "Auditing",
  "Economic Research",
  "Macroeconomics",
];

const categoryColors = {
  "Financial Analysis":
    "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  "Budgeting & Planning":
    "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400",
  Taxation:
    "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  "Cost Accounting":
    "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  Auditing: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  "Economic Research":
    "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  Macroeconomics:
    "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
};

// ── Full Report Modal ──────────────────────────────────────────
function ReportModal({ project, onClose, onBack }) {
  const r = project.fullReport;
  const [tab, setTab] = useState("overview");

  const tabs = [
    { id: "overview", label: "Overview", icon: FiBookOpen },
    { id: "methodology", label: "Methodology", icon: FiTarget },
    { id: "findings", label: "Findings", icon: FiBarChart2 },
    { id: "conclusion", label: "Conclusion", icon: FiCheckCircle },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-ink-900/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.95 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="bg-white dark:bg-ink-900 rounded-3xl shadow-2xl w-full max-w-3xl max-h-[95vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header image */}
        <div className="relative h-36 sm:h-44 shrink-0">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-900/90 via-ink-900/40 to-transparent" />

          {/* Back button */}
          <button
            onClick={onBack}
            className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm transition-all text-xs font-medium"
          >
            <FiArrowLeft size={13} /> Back
          </button>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm transition-all"
          >
            <FiX size={16} />
          </button>

          <div className="absolute bottom-3 left-4 right-4">
            <div className="flex gap-2 mb-1.5 flex-wrap">
              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${categoryColors[project.category]}`}
              >
                {project.category}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white/20 text-white">
                {project.type}
              </span>
            </div>
            <h2 className="font-display font-bold text-white text-base sm:text-lg leading-snug line-clamp-2">
              {project.title}
            </h2>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-ink-100 dark:border-ink-800 px-2 shrink-0 overflow-x-auto">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`flex items-center gap-1.5 px-3 sm:px-4 py-3 text-xs font-semibold border-b-2 transition-all whitespace-nowrap ${
                tab === id
                  ? "border-teal-500 text-teal-600 dark:text-teal-400"
                  : "border-transparent text-ink-500 dark:text-ink-400 hover:text-ink-800 dark:hover:text-ink-200"
              }`}
            >
              <Icon size={12} /> {label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="overflow-y-auto flex-1 p-5 sm:p-6">
          <AnimatePresence mode="wait">
            {/* OVERVIEW */}
            {tab === "overview" && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-5"
              >
                <div>
                  <h3 className="text-xs font-bold text-ink-400 dark:text-ink-500 uppercase tracking-widest mb-2">
                    Project Overview
                  </h3>
                  <p className="text-sm text-ink-700 dark:text-ink-300 leading-relaxed">
                    {r.overview}
                  </p>
                </div>
                <div>
                  <h3 className="text-xs font-bold text-ink-400 dark:text-ink-500 uppercase tracking-widest mb-3">
                    Objectives
                  </h3>
                  <ul className="space-y-2">
                    {r.objectives.map((obj, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="w-5 h-5 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        <span className="text-sm text-ink-600 dark:text-ink-400 leading-relaxed">
                          {obj}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xs font-bold text-ink-400 dark:text-ink-500 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                    <FiTag size={12} /> Tools & Methods Used
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tools.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1.5 bg-ink-100 dark:bg-ink-800 text-ink-700 dark:text-ink-300 text-xs rounded-xl font-medium border border-ink-200 dark:border-ink-700"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* METHODOLOGY */}
            {tab === "methodology" && (
              <motion.div
                key="methodology"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                <h3 className="text-xs font-bold text-ink-400 dark:text-ink-500 uppercase tracking-widest mb-1">
                  Research Methodology
                </h3>
                {r.methodology.map((step, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-xl bg-teal-500 text-white flex items-center justify-center text-xs font-bold shrink-0">
                        {i + 1}
                      </div>
                      {i < r.methodology.length - 1 && (
                        <div className="w-px flex-1 bg-ink-200 dark:bg-ink-700 mt-2" />
                      )}
                    </div>
                    <div className="pb-4">
                      <h4 className="font-semibold text-sm text-ink-900 dark:text-ink-100 mb-1">
                        {step.heading}
                      </h4>
                      <p className="text-sm text-ink-600 dark:text-ink-400 leading-relaxed">
                        {step.body}
                      </p>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {/* FINDINGS */}
            {tab === "findings" && (
              <motion.div
                key="findings"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-5"
              >
                <div>
                  <h3 className="text-xs font-bold text-ink-400 dark:text-ink-500 uppercase tracking-widest mb-3">
                    Key Findings
                  </h3>
                  <ul className="space-y-2.5">
                    {r.keyFindings.map((f, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 p-3 rounded-xl bg-ink-50 dark:bg-ink-800/60 border border-ink-100 dark:border-ink-700"
                      >
                        <FiCheckCircle
                          className="text-teal-500 mt-0.5 shrink-0"
                          size={14}
                        />
                        <span className="text-sm text-ink-700 dark:text-ink-300 leading-relaxed">
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {r.tables &&
                  r.tables.map((table, ti) => (
                    <div key={ti}>
                      <h3 className="text-xs font-bold text-ink-400 dark:text-ink-500 uppercase tracking-widest mb-3">
                        {table.title}
                      </h3>
                      <div className="overflow-x-auto rounded-2xl border border-ink-100 dark:border-ink-800">
                        <table className="w-full text-xs">
                          <thead>
                            <tr className="bg-teal-500/10 dark:bg-teal-500/5">
                              {table.headers.map((h, i) => (
                                <th
                                  key={i}
                                  className="px-3 py-2.5 text-left font-semibold text-teal-700 dark:text-teal-400 whitespace-nowrap"
                                >
                                  {h}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {table.rows.map((row, ri) => (
                              <tr
                                key={ri}
                                className={`border-t border-ink-100 dark:border-ink-800 ${ri % 2 === 0 ? "bg-white dark:bg-ink-900" : "bg-ink-50/50 dark:bg-ink-800/30"}`}
                              >
                                {row.map((cell, ci) => (
                                  <td
                                    key={ci}
                                    className={`px-3 py-2.5 text-ink-700 dark:text-ink-300 whitespace-nowrap ${ci === 0 ? "font-medium" : ""}`}
                                  >
                                    {cell}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ))}

                <div className="p-4 rounded-2xl bg-teal-500/5 border border-teal-500/20">
                  <div className="flex items-start gap-3">
                    <FiAward
                      className="text-teal-600 dark:text-teal-400 mt-0.5 shrink-0"
                      size={16}
                    />
                    <div>
                      <p className="text-xs font-bold text-teal-700 dark:text-teal-400 uppercase tracking-wider mb-1">
                        Overall Outcome
                      </p>
                      <p className="text-sm text-ink-700 dark:text-ink-300 font-medium">
                        {project.outcome}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* CONCLUSION */}
            {tab === "conclusion" && (
              <motion.div
                key="conclusion"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-5"
              >
                <div>
                  <h3 className="text-xs font-bold text-ink-400 dark:text-ink-500 uppercase tracking-widest mb-2">
                    Conclusion
                  </h3>
                  <p className="text-sm text-ink-700 dark:text-ink-300 leading-relaxed">
                    {r.conclusion}
                  </p>
                </div>
                <div>
                  <h3 className="text-xs font-bold text-ink-400 dark:text-ink-500 uppercase tracking-widest mb-3">
                    Recommendations
                  </h3>
                  <ul className="space-y-3">
                    {r.recommendations.map((rec, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <FiArrowRight
                          className="text-teal-500 mt-1 shrink-0"
                          size={13}
                        />
                        <span className="text-sm text-ink-600 dark:text-ink-400 leading-relaxed">
                          {rec}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pt-4 border-t border-ink-100 dark:border-ink-800">
                  <p className="text-xs text-ink-400 dark:text-ink-600 text-center">
                    Academic project · Md Ibna Siam · Daffodil International
                    University · Department of Accounting
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Summary Modal ──────────────────────────────────────────────
function SummaryModal({ project, onClose, onViewReport }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-ink-900/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 30 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="bg-white dark:bg-ink-900 rounded-3xl shadow-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image */}
        <div className="relative h-44 sm:h-52 rounded-t-3xl overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-900/80 via-ink-900/30 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm transition-all"
          >
            <FiX size={18} />
          </button>
          <div className="absolute bottom-4 left-5 flex gap-2 flex-wrap">
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${categoryColors[project.category]}`}
            >
              {project.category}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/20 text-white">
              {project.type}
            </span>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <h3 className="font-display text-xl sm:text-2xl font-bold text-ink-900 dark:text-ink-50 mb-3 leading-snug">
            {project.title}
          </h3>
          <p className="text-sm text-ink-600 dark:text-ink-400 leading-relaxed mb-6">
            {project.description}
          </p>

          {/* Key tasks */}
          <div className="mb-6">
            <h4 className="text-xs font-bold text-ink-400 dark:text-ink-500 uppercase tracking-widest mb-3 flex items-center gap-2">
              <FiChevronRight className="text-teal-500" size={14} /> Key Tasks &
              Deliverables
            </h4>
            <ul className="space-y-2.5">
              {project.details.map((point, i) => (
                <li key={i} className="flex items-start gap-3">
                  <FiCheckCircle
                    className="text-teal-500 dark:text-teal-400 mt-0.5 shrink-0"
                    size={15}
                  />
                  <span className="text-sm text-ink-600 dark:text-ink-400 leading-relaxed">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Outcome */}
          <div className="mb-6 p-4 rounded-2xl bg-teal-500/5 border border-teal-500/20">
            <div className="flex items-start gap-3">
              <FiAward
                className="text-teal-600 dark:text-teal-400 mt-0.5 shrink-0"
                size={18}
              />
              <div>
                <p className="text-xs font-bold text-teal-700 dark:text-teal-400 uppercase tracking-wider mb-1">
                  Outcome / Result
                </p>
                <p className="text-sm text-ink-700 dark:text-ink-300 font-medium">
                  {project.outcome}
                </p>
              </div>
            </div>
          </div>

          {/* Tools */}
          <div className="mb-6">
            <h4 className="text-xs font-bold text-ink-400 dark:text-ink-500 uppercase tracking-widest mb-3 flex items-center gap-1.5">
              <FiTag size={12} /> Tools & Methods
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.tools.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1.5 bg-ink-100 dark:bg-ink-800 text-ink-700 dark:text-ink-300 text-xs rounded-xl font-medium border border-ink-200 dark:border-ink-700"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Action buttons — pure buttons, no href, no navigation */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onViewReport}
              className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600 text-white rounded-xl font-medium text-sm transition-all shadow-lg shadow-teal-500/20 cursor-pointer"
            >
              <FiBookOpen size={15} /> View Full Report
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex items-center justify-center gap-2 px-5 py-3 bg-ink-100 dark:bg-ink-800 hover:bg-ink-200 dark:hover:bg-ink-700 text-ink-700 dark:text-ink-300 rounded-xl font-medium text-sm transition-all border border-ink-200 dark:border-ink-700 cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Project Card ───────────────────────────────────────────────
function ProjectCard({ project, onClick }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      onClick={() => onClick(project)}
      className="group cursor-pointer bg-white dark:bg-ink-900 rounded-2xl overflow-hidden border border-ink-100 dark:border-ink-800 hover:border-teal-400/40 dark:hover:border-teal-500/30 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300"
    >
      <div className="relative overflow-hidden h-44">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900/70 via-ink-900/20 to-transparent" />

        <div className="absolute top-3 left-3">
          <span
            className={`px-2.5 py-1 rounded-full text-xs font-semibold ${categoryColors[project.category]}`}
          >
            {project.category}
          </span>
        </div>

        {project.featured && (
          <div className="absolute top-3 right-3">
            <span className="px-2.5 py-1 bg-teal-500 text-white text-xs font-semibold rounded-full">
              ⭐ Featured
            </span>
          </div>
        )}

        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <span className="px-5 py-2 bg-white/95 text-ink-900 rounded-xl text-xs font-semibold shadow-lg">
            Click to view details →
          </span>
        </div>

        <div className="absolute bottom-3 left-3">
          <span className="text-xs text-white/70 font-mono">
            {project.type}
          </span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-display font-semibold text-base text-ink-900 dark:text-ink-100 mb-2 leading-snug group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors line-clamp-2">
          {project.title}
        </h3>
        <p className="text-sm text-ink-500 dark:text-ink-400 leading-relaxed mb-3 line-clamp-2">
          {project.description}
        </p>
        <div className="flex items-start gap-2 mb-4 p-2.5 rounded-xl bg-teal-500/5 border border-teal-500/15">
          <FiAward className="text-teal-500 mt-0.5 shrink-0" size={12} />
          <p className="text-xs text-ink-600 dark:text-ink-400 leading-relaxed line-clamp-2">
            {project.outcome}
          </p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {(project.tools || []).slice(0, 3).map((t) => (
            <span
              key={t}
              className="px-2 py-1 bg-ink-100 dark:bg-ink-800 text-ink-600 dark:text-ink-400 text-xs rounded-lg font-medium"
            >
              {t}
            </span>
          ))}
          {(project.tools || []).length > 3 && (
            <span className="px-2 py-1 bg-ink-100 dark:bg-ink-800 text-ink-500 text-xs rounded-lg font-medium">
              +{(project.tools || []).length - 3}
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}

// ── Main Section ───────────────────────────────────────────────
export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeCategory, setActiveCategory] = useState("All");
  const [summaryProject, setSummaryProject] = useState(null);
  const [reportProject, setReportProject] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  const displayed = showAll ? filtered : filtered.slice(0, 6);

  const openSummary = (project) => {
    setSummaryProject(project);
    setReportProject(null);
  };

  const openReport = () => {
    setReportProject(summaryProject);
    setSummaryProject(null);
  };

  const backToSummary = () => {
    setSummaryProject(reportProject);
    setReportProject(null);
  };

  const closeAll = () => {
    setSummaryProject(null);
    setReportProject(null);
  };

  return (
    <section id="projects" className="py-24">
      <div ref={ref} className="max-w-6xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <SectionHeading
            label="Academic work"
            title="Projects & Case Studies"
            subtitle="Click any project card to see full details, methodology, data tables, and recommendations."
          />

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10"
          >
            {[
              { value: projects.length, label: "Total Projects" },
              {
                value: projects.filter((p) => p.featured).length,
                label: "Featured",
              },
              {
                value: [...new Set(projects.map((p) => p.category))].length,
                label: "Categories",
              },
              { value: "DIU", label: "Institution" },
            ].map(({ value, label }) => (
              <div
                key={label}
                className="bg-white dark:bg-ink-900 rounded-2xl p-4 border border-ink-100 dark:border-ink-800 text-center shadow-sm"
              >
                <div className="font-display text-2xl font-bold text-teal-600 dark:text-teal-400">
                  {value}
                </div>
                <div className="text-xs text-ink-500 dark:text-ink-400 mt-1">
                  {label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Category filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setActiveCategory(cat);
                  setShowAll(false);
                }}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-teal-600 dark:bg-teal-500 text-white shadow-md"
                    : "bg-white dark:bg-ink-800 text-ink-600 dark:text-ink-400 hover:bg-ink-200 dark:hover:bg-ink-700 border border-ink-200 dark:border-ink-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {displayed.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onClick={openSummary}
                />
              ))}
            </AnimatePresence>
          </div>

          {/* Show more */}
          {filtered.length > 6 && (
            <div className="text-center mt-10">
              <button
                type="button"
                onClick={() => setShowAll((v) => !v)}
                className="px-8 py-3 rounded-xl border-2 border-teal-500/40 dark:border-teal-400/30 text-teal-600 dark:text-teal-400 hover:bg-teal-500/10 font-medium text-sm transition-all"
              >
                {showAll ? "Show Less" : `View All ${filtered.length} Projects`}
              </button>
            </div>
          )}

          <p className="text-center text-xs text-ink-400 dark:text-ink-600 mt-8">
            All projects are academic work completed as part of BBA studies at
            Daffodil International University.
          </p>
        </motion.div>
      </div>

      {/* Modals — rendered outside the section, no href links */}
      <AnimatePresence>
        {summaryProject && (
          <SummaryModal
            key="summary"
            project={summaryProject}
            onClose={closeAll}
            onViewReport={openReport}
          />
        )}
        {reportProject && (
          <ReportModal
            key="report"
            project={reportProject}
            onClose={closeAll}
            onBack={backToSummary}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
