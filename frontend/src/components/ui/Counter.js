import React from "react";
import { cn } from "../../lib/cn";
import { useCountUp } from "../../hooks/useCountUp";
import { useInView } from "../../hooks/useInView";

/** Values like "500+" or "1+ yrs" animate their leading number. */
const LEADING_NUMBER = /^(\d+)(.*)$/s;

/**
 * Animated statistic.
 *
 * Accepts the raw display string from the data layer and animates only a
 * leading integer, so entries such as "Angular 8 -> 15" render verbatim
 * rather than being mangled into a count-up.
 *
 * @param {object} props
 * @param {string} props.value
 */
export function Counter({ value, className, ...rest }) {
  const [ref, inView] = useInView({ threshold: 0.4 });
  const match = LEADING_NUMBER.exec(value);
  const target = match ? Number(match[1]) : 0;
  const current = useCountUp(target, { active: inView && Boolean(match) });

  return (
    <span ref={ref} className={cn("numeric", className)} {...rest}>
      {match ? (
        <>
          {inView ? current : 0}
          {match[2]}
        </>
      ) : (
        value
      )}
    </span>
  );
}

export default Counter;
