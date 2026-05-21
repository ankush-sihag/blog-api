const request = require(
    'supertest'
);

const app = require(
    '../../src/app'
);

require('../setup/testSetup');

describe(
    'Post APIs',
    () => {

        test(
            'should fetch all posts',
            async () => {

                const response =
                    await request(app)
                        .get(
                            '/api/v1/posts'
                        );

                expect(
                    response.statusCode
                ).toBe(200);

                expect(
                    response.body.success
                ).toBe(true);
            }
        );
    }
);