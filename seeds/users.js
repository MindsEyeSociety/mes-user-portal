'use strict';

exports.seed = ( knex, Promise ) => {
	return Promise.join(

		// Deletes ALL existing entries
		knex( 'users' ).del(),

		// Inserts seed entries
		knex( 'users' ).insert([
			{
				id: 1,
				firstName: 'Test',
				lastName: 'Admin',
				email: 'admin@test.com',
				membershipType: 'Full',
				membershipNumber: 'US2016010001',
				membershipExpiration: '2020-01-01',
				orgUnit: 7
			},
			{
				id: 2,
				firstName: 'Test',
				lastName: 'NC',
				email: 'nc@test.com',
				membershipType: 'Full',
				membershipNumber: 'US2016010002',
				membershipExpiration: '2020-01-01',
				orgUnit: 6
			},
			{
				id: 3,
				firstName: 'Test',
				lastName: 'RC',
				email: 'rc@test.com',
				membershipType: 'Full',
				membershipNumber: 'US2016010003',
				membershipExpiration: '2020-01-01',
				orgUnit: 3
			},
			{
				id: 4,
				firstName: 'Test',
				lastName: 'DST',
				email: 'dst@test.com',
				membershipType: 'Full',
				membershipNumber: 'US2016010004',
				membershipExpiration: '2020-01-01',
				orgUnit: 3
			},
			{
				id: 5,
				firstName: 'Test',
				lastName: 'User',
				email: 'test@test.com',
				membershipType: 'Full',
				membershipNumber: 'US2016010005',
				membershipExpiration: '2020-01-01',
				orgUnit: 3
			},
			{
				id: 6,
				firstName: 'Test',
				lastName: 'Expired',
				email: 'expired@test.com',
				membershipType: 'Full',
				membershipNumber: 'US2016010006',
				membershipExpiration: '2000-01-01',
				orgUnit: 3
			},
			{
				id: 7,
				firstName: 'Test',
				lastName: 'Trial',
				email: 'trial@test.com',
				membershipType: 'Trial',
				membershipNumber: 'US2016010007',
				membershipExpiration: '2020-01-01',
				orgUnit: 3
			},
			{
				id: 8,
				portalID: 375,
				firstName: 'Echo',
				lastName: 'Gregor',
				email: 'ephraimgregor@gmail.com',
				membershipType: 'Full',
				membershipNumber: 'US2012030038',
				membershipExpiration: '2017-09-05',
				orgUnit: 3
			},
			{
				id: 9,
				firstName: 'Test',
				lastName: 'Domainless',
				email: 'nodomain@test.com',
				membershipType: 'Full',
				membershipNumber: 'US2016010009',
				membershipExpiration: '2020-01-01'
			},
			{
				id: 10,
				firstName: 'Test',
				lastName: 'aRC',
				email: 'arc.members@ne.mindseyesociety.org',
				membershipType: 'Full',
				membershipNumber: 'US2016010010',
				membershipExpiration: '2020-01-01',
				portalID: 10
			},
			{
				id: 11,
				firstName: 'Test',
				lastName: 'Suspended',
				email: 'suspended@test.com',
				membershipType: 'Suspended',
				membershipNumber: 'US2016010011',
				membershipExpiration: '2020-01-01',
				orgUnit: 3
			}
		])
	);
};
