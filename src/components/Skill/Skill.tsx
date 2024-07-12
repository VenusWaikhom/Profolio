import React, { useEffect, useRef } from "react";
import { SkillChart } from "./SkillChart";
import "./Skill.css";

interface SkillItem {
  name: string;
  icon: string;
  Level: string;
}

const Skill: React.FC = () => {
  const skillRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const currentRefs = skillRefs.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = currentRefs.indexOf(entry.target as HTMLDivElement);
            if (index !== -1 && SkillChart[index]) {
              (entry.target as HTMLDivElement).style.width =
                SkillChart[index].Level;
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    currentRefs.forEach((ref) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    return () => {
      currentRefs.forEach((ref) => {
        if (ref) {
          observer.unobserve(ref);
        }
      });
    };
  }, []);

  return (
    <div
      id="Skill-Block"
      className="mb-5  flex flex-wrap content-center justify-center flex-col gap-10"
    >
      <div className="Skill-Header flex flex-wrap content-center justify-center z-1 p-n">
        SKILLS
      </div>
      <div className="Skills-Wrapper">
        {SkillChart?.map((item: SkillItem, index: number) => (
          <div key={index} className="SkillChartWrapper z-1 p-n">
            <div className="Skill-Logo-Wrapper flex flex-wrap content-center justify-center">
              <img
                src={item.icon}
                alt={`${item.name} Logo`}
                className="Skill-Logo"
              />
            </div>
            <div className="Skill-Level">
              <div
                ref={(el) => (skillRefs.current[index] = el)}
                className={"Skill-Level-" + item.name}
                style={{ height: "100%" }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skill;
