const request = require('supertest');

const app = require('../../src/app');

require('../setup/testSetup');

describe(
    'Authentication APIs',
    () => {

        test(
            'should register user successfully',
            async () => {

                const response =
                    await request(app)
                        .post(
                            '/api/v1/auth/register'
                        )
                        .send({
                            name: 'Test User',
                            email:
                                'test@example.com',
                            password:
                                'password123'
                        });
                
                console.log("SERVER ERROR DETAILS:", response.body);
                
                expect(
                    response.statusCode
                ).toBe(201);

                expect(
                    response.body.success
                ).toBe(true);
            }
        );
    }
);