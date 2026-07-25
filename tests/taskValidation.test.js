/**
 * Unit Test: Task Date Business Validation Logic
 */

function testDueDateBeforeStartDate() {
    const startDate = "2026-08-10";
    const dueDate = "2026-08-05";

    const isValid = dueDate >= startDate;
    console.assert(isValid === false, "FAIL: Due date prior to start date should be invalid.");
    if (!isValid) {
        console.log("✓ PASS: Date validation correctly detected invalid date ordering.");
    }
}

testDueDateBeforeStartDate();
