import fs from "fs";
import init from "../src/cmd/init";
import mockPackage from "../__mocks__/package.json";

describe("tests for init function", () => {
  const mockRead = jest
    .spyOn(fs, "readFileSync")
    .mockImplementation(() => JSON.stringify(mockPackage));

  const mockWrite = jest
    .spyOn(fs, "writeFileSync")
    .mockImplementation(() => {});

  test("correct project name should be added to JSON", async () => {
    await init();
    const [path, json] = mockWrite.mock.calls[0];
    const trueJson = JSON.parse(json.toString());
    expect(trueJson.packageExclusions).toContain(mockPackage.name);
  });
});

afterAll(() => {
  jest.restoreAllMocks();
});
