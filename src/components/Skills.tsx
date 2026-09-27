"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { defaultSkillCategoryId, skillCategories } from "@/data/skills";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

/**
 * Skills, presented as a developer interface rather than a badge wall.
 *
 * The category list is a real tab set: arrow keys, Home/End and a roving
 * tabindex. **Every** category panel is rendered, with the inactive ones hidden,
 * so the full technology list is always in the document — a click only changes
 * which panel is visible, and every tab's `aria-controls` resolves to a real
 * element. Each technology is a reusable card whose "where it is used" detail is
 * revealed on hover or focus — but always present in the DOM, so it stays
 * accessible and readable.
 *
 * Deliberately no proficiency percentages: nothing here claims a measured
 * skill level.
 */
export function Skills() {
  const [activeId, setActiveId] = useState(
    defaultSkillCategoryId ?? skillCategories[0]?.id ?? ""
  );
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const activeIndex = skillCategories.findIndex((item) => item.id === activeId);
  const active = skillCategories[activeIndex] ?? skillCategories[0];

  function focusTab(index: number) {
    const bounded = (index + skillCategories.length) % skillCategories.length;
    setActiveId(skillCategories[bounded].id);
    tabRefs.current[bounded]?.focus();
  }

  function onTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const keys = ["ArrowDown", "ArrowRight", "ArrowUp", "ArrowLeft", "Home", "End"];
    if (!keys.includes(event.key)) return;
    event.preventDefault();

    if (event.key === "Home") return focusTab(0);
    if (event.key === "End") return focusTab(skillCategories.length - 1);
    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      return focusTab(index + 1);
    }
    return focusTab(index - 1);
  }

  return (
    <section
      id="skills"
      className="relative border-t border-line py-24 sm:py-28 lg:py-32"
    >
      <div className="shell">
        <Reveal>
          <SectionHeading
            index="02"
            label="Skills"
            title="The stack, and where it is used."
            description="Each technology lists where it is actually used, where that has been confirmed."
          />
        </Reveal>

        <div className="mt-14 grid gap-8 lg:grid-cols-[minmax(0,17rem)_1fr] lg:gap-12">
          <Reveal>
            <div
              role="tablist"
              aria-label="Skill categories"
              aria-orientation="vertical"
              className="-mx-1 flex gap-1 overflow-x-auto pb-2 lg:mx-0 lg:flex-col lg:overflow-visible lg:pb-0"
            >
              {skillCategories.map((category, index) => {
                const isActive = category.id === active.id;
                return (
                  <button
                    key={category.id}
                    ref={(node) => {
                      tabRefs.current[index] = node;
                    }}
                    type="button"
                    role="tab"
                    id={`skill-tab-${category.id}`}
                    aria-selected={isActive}
                    aria-controls={`skill-panel-${category.id}`}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => setActiveId(category.id)}
                    onKeyDown={(event) => onTabKeyDown(event, index)}
                    className={cn(
                      "group relative flex shrink-0 items-center justify-between gap-4 rounded-lg border px-4 py-3 text-left transition-colors duration-300",
                      isActive
                        ? "border-line-strong bg-surface text-ink"
                        : "border-transparent text-muted hover:border-line hover:text-ink"
                    )}
                  >
                    <span className="flex items-center gap-3">
                      <span className="meta text-muted">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="text-sm font-medium whitespace-nowrap">
                        {category.label}
                      </span>
                    </span>
                    <span className="meta hidden text-muted lg:inline">
                      {category.skills.length}
                    </span>
                    {isActive && (
                      <span
                        aria-hidden="true"
                        className="absolute inset-y-2 left-0 w-px bg-accent"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </Reveal>

          <Reveal delay={80}>
            {/* Every category panel is rendered, with the inactive ones hidden.
                Previously only the active panel existed, which caused two
                problems: 17 of the 46 technologies appeared nowhere in the
                document at all, and each inactive tab's `aria-controls` pointed
                at an id that was not in the DOM. The interaction is unchanged —
                `hidden` is `display: none` (from Tailwind preflight, with
                `!important`), so inactive panels stay out of the accessibility
                tree and the tab order, and only one category is ever visible. */}
            {skillCategories.map((category) => {
              const isActive = category.id === active.id;

              return (
                <div
                  key={category.id}
                  role="tabpanel"
                  id={`skill-panel-${category.id}`}
                  aria-labelledby={`skill-tab-${category.id}`}
                  tabIndex={-1}
                  hidden={!isActive}
                  className="card p-6 sm:p-8"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-line pb-5">
                    <h3 className="text-lg font-semibold text-ink">
                      {category.label}
                    </h3>
                    <span className="meta text-muted">
                      {category.skills.length} technologies
                    </span>
                  </div>

                  <p className="mt-5 max-w-2xl text-sm leading-relaxed text-ink-soft">
                    {category.blurb}
                  </p>

                  <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                    {category.skills.map((skill) => (
                      <li
                        key={skill.name}
                        tabIndex={0}
                        className="group/skill rounded-lg border border-line bg-[color-mix(in_oklab,var(--canvas)_55%,transparent)] p-4 transition-colors duration-300 hover:border-accent/40 focus-within:border-accent/40"
                      >
                        <div className="flex items-baseline justify-between gap-3">
                          <span className="meta-sm font-medium text-ink">
                            {skill.name}
                          </span>
                          <span className="meta text-muted">
                            {category.label}
                          </span>
                        </div>

                        {skill.context && skill.context.length > 0 && (
                          <ul className="mt-3 space-y-1.5 border-t border-line pt-3">
                            {skill.context.map((usage) => (
                              <li
                                key={usage}
                                className="meta-sm flex items-start gap-2 text-muted transition-colors duration-300 group-hover/skill:text-ink-soft group-focus-within/skill:text-ink-soft"
                              >
                                <span
                                  aria-hidden="true"
                                  className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-line-strong"
                                />
                                {usage}
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </Reveal>
        </div>
      </div>
    </section>
  );
}