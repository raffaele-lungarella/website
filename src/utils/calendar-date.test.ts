import assert from "node:assert/strict";
import test from "node:test";

import {
  calendarDateToDate,
  formatCalendarDate,
  getCalendarYear,
  isCalendarDate,
} from "./calendar-date.ts";

test("isCalendarDate accepts valid calendar dates", () => {
  for (const date of ["0001-01-01", "2024-02-29", "2025-12-31", "9999-06-15"]) {
    assert.equal(isCalendarDate(date), true, date);
  }
});

test("isCalendarDate rejects nonexistent dates", () => {
  for (const date of [
    "2023-02-29",
    "2024-02-30",
    "2025-04-31",
    "2025-00-01",
    "2025-13-01",
    "2025-01-00",
    "2025-01-32",
  ]) {
    assert.equal(isCalendarDate(date), false, date);
  }
});

test("isCalendarDate rejects incorrectly formatted dates", () => {
  for (const date of [
    "",
    "2025",
    "2025-1-01",
    "2025-01-1",
    "25-01-01",
    "2025/01/01",
    "2025-01-01T00:00:00Z",
    "not-a-date",
  ]) {
    assert.equal(isCalendarDate(date), false, date);
  }
});

test("calendarDateToDate creates midnight UTC", () => {
  const date = calendarDateToDate("2025-07-14");

  assert.equal(date.toISOString(), "2025-07-14T00:00:00.000Z");
});

test("formatCalendarDate formats a date in en-US using UTC", () => {
  assert.equal(formatCalendarDate("2025-07-14"), "Jul 14, 2025");
});

test("formatCalendarDate can show only month and year", () => {
  assert.equal(formatCalendarDate("2025-07-14"), "Jul 2025");
  assert.equal(formatCalendarDate("2025-01-01"), "Jan 2025");
});

test("getCalendarYear extracts the numeric year", () => {
  assert.equal(getCalendarYear("2025-07-14"), 2025);
  assert.equal(getCalendarYear("0001-01-01"), 1);
});
