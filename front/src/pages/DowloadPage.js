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
					name: 'video',
					meta: {
						displayName: 'Аудио',
						displayType: 'file',
						displayProps: {
							md: 6,
							accept: 'audio/mp3',
						}
					}
				},
				{
					name: 'video',
					meta: {
						displayName: 'Видео',
						displayType: 'file',
						displayProps: {
							md: 6,
							accept: 'audio/mp4',
						}
					}
				},
				{
					name: 'manual',
					meta: {
						displayName: 'Методичка',
						displayType: 'file',
						displayProps: {
							md: 6,
						}
					}
				},

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
