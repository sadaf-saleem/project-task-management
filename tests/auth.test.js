/**
 * Unit Test: Email Format Validation
 */

function testEmailValidation() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    console.assert(emailRegex.test("valid@enterprise.com") === true, "FAIL: Valid email rejected.");
    console.assert(emailRegex.test("invalid-email") === false, "FAIL: Invalid email accepted.");
    
    console.log("✓ PASS: Email validation regex test passed successfully.");
}

testEmailValidation();
