const { strict: assert } = require('assert');
const { convertToHexValue, withFixtures } = require('../helpers');
const FixtureBuilder = require('../fixture-builder');

describe('Segment metrics', function () {
  async function mockSegment(mockServer) {
    return await mockServer
      .forPost('https://api.segment.io/v1/batch')
      .withJsonBodyIncluding({ batch: [{ type: 'page' }] })
      .times(3)
      .thenCallback(() => {
        return {
          statusCode: 200,
        };
      });
  }
  const ganacheOptions = {
    accounts: [
      {
        secretKey:
          '0x7C9529A67102755B7E6102D6D950AC5D5863C98713805CEC576B945B15B71EAC',
        balance: convertToHexValue(25000000000000000000),
      },
    ],
  };
  it('should send first three Page metric events upon fullscreen page load', async function () {
    await withFixtures(
      {
        fixtures: new FixtureBuilder()
          .withMetaMetricsController({
            metaMetricsId: 'fake-metrics-id',
            participateInMetaMetrics: true,
          })
          .build(),
        ganacheOptions,
        title: this.test.title,
        testSpecificMock: mockSegment,
      },
      async ({ driver, mockedEndpoint }) => {
        await driver.navigate();
        await driver.fill('#password', 'correct horse battery staple');
        await driver.press('#password', driver.Key.ENTER);
        await driver.wait(async () => {
          const isPending = await mockedEndpoint.isPending();
          return isPending === false;
        }, 10000);
        const mockedRequests = await mockedEndpoint.getSeenRequests();
        assert.equal(mockedRequests.length, 3);
        const [firstMock, secondMock, thirdMock] = mockedRequests;
        let [mockJson] = firstMock.body.json.batch;
        let { title, path } = mockJson.context.page;
        assert.equal(title, 'Home');
        assert.equal(path, '/');
        [mockJson] = secondMock.body.json.batch;
        ({ title, path } = mockJson.context.page);
        assert.equal(title, 'Unlock Page');
        assert.equal(path, '/unlock');
        [mockJson] = thirdMock.body.json.batch;
        ({ title, path } = mockJson.context.page);
        assert.equal(title, 'Home');
        assert.equal(path, '/');
      },
    );
  });
});
