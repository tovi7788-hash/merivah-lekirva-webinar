import { describe, expect, it } from "vitest";
import { answerWeights, calculateQuizScore, getQuizResult, quizQuestions } from "@/lib/relationship-quiz";

describe("Relationship quiz scoring", () => {
  it("requires all five answers before calculating a result", () => {
    expect(quizQuestions).toHaveLength(5);
    expect(calculateQuizScore([0, 0, 0, 0])).toBeNull();
    expect(calculateQuizScore([])).toBeNull();
  });
  it("assigns the four answers 4/3/2/1 points", () => {
    expect(answerWeights).toEqual([4, 3, 2, 1]);
    expect(calculateQuizScore([0, 0, 0, 0, 0])).toBe(20);
    expect(calculateQuizScore([1, 1, 1, 1, 1])).toBe(15);
    expect(calculateQuizScore([2, 2, 2, 2, 2])).toBe(10);
    expect(calculateQuizScore([3, 3, 3, 3, 3])).toBe(5);
    expect(calculateQuizScore([0, 1, 2, 3, 0])).toBe(14);
  });
  it.each([[0, 3], [8, 3], [9, 2], [12, 2], [13, 1], [16, 1], [17, 0], [20, 0]])("maps score %i to result band %i", (score, band) => {
    const thresholds = [17, 13, 9, 0];
    expect(getQuizResult(score)?.min).toBe(thresholds[band]);
  });
  it("rejects invalid answers and scores", () => {
    expect(calculateQuizScore([0, 0, 0, 0, 4])).toBeNull();
    expect(calculateQuizScore([0, 0, 0, 0, -1])).toBeNull();
    expect(getQuizResult(21)).toBeNull();
    expect(getQuizResult(-1)).toBeNull();
  });
});