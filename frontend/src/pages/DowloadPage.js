import MuiForms from 'mui-forms';

const schema = {
	fields: [
		{
			name: 'summary',
			meta: {
				displayName: 'Basic Details',
				type: 'section'
			},
			fields: [
				{
					name: 'name_of_company',
					meta: {
						displayName: 'Название лекции',
						displayType: 'text_field',
						displayProps: {
							md: 6
						}
					}
				},
				{
					name: 'city',
					meta: {
						displayName: 'Лектор',
						displayType: 'select',
						options: [
							{
								label: 'City1',
								value: 'city1'
							},
							{
								label: 'City2',
								value: 'city2'
							}
						],
						displayProps: {
							md: 6
						}
					}
				},

				{
					name: 'address_header',
					prop: null,
					meta: {
						displayName: 'Address',
						displayType: 'header',
						displayProps: {
							md: 12
						}
					}
				},
				{
					name: 'street_address_1',
					meta: {
						displayName: 'Street Address',
						displayType: 'text_field'
					}
				},
				{
					name: 'street_address_2',
					meta: {
						displayName: 'Street Address 2',
						displayType: 'text_field'
					}
				},
				{
					name: 'state',
					meta: {
						displayName: 'Аудио',
						displayType: 'file',
						displayProps: {
							md: 6,
							accept: 'audio/mp3',
							fileFilter: (file) => {
								const acceptedTypes = ['audio/mp3'];
								const fileType = file.type;

								return acceptedTypes.includes(fileType);
							}
						}
					}
				},

				{
					name: 'pinocde',
					meta: {
						displayName: 'Pincode',
						displayType: 'text_field',
						displayProps: {
							md: 6
						},
						validation: {
							required: true,
							pattern: '^[1-9][0-9]{5}$',
							patternDetail: {
								errorMsg: 'Pincode is not valid'
							}
						}
					}
				},
				{
					name: 'country',
					meta: {
						displayName: 'Country',
						displayType: 'text_field',
						value: 'INDIA',
						isReadonly: true,
						displayProps: {
							md: 6
						},
						validation: {
							required: true
						}
					}
				}
			]
		},
		{
			name: 'contact_details',
			meta: {
				displayName: 'Contact details',
				type: 'section'
			},
			fields: [
				{
					name: 'same_address',
					meta: {
						displayName: 'Use same address as registered address',
						displayType: 'checkbox'
					}
				},
				{
					name: 'correspondence_address',
					meta: {
						displayName: 'Address line 1',
						displayType: 'text_field'
					}
				},
				{
					name: 'correspondence_address2',
					meta: {
						displayName: 'Address line 2',
						displayType: 'text_field',
						displayProps: {
							md: 6
						}
					}
				}
			]
		}
	]
};

function DownloadPage() {
	return (
		<MuiForms
			schema={schema}
			onSubmit={() => {
				// to do
			}}
		/>
	);
}

export default DownloadPage;
