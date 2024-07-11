export interface  TestCase {
    status: boolean;
    test: string;
}

export interface  SeleniumTest {
    status: boolean;
    totalPassedTest: number;
    totalFailedTest: number;
    testCase :TestCase[];

}