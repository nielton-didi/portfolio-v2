import type { ExperienceDTO, ProjectDTO } from '$lib/dto/system.dto';

export class SystemConstant {
	public static experience: ExperienceDTO[] = [
		{
			startYear: 'Jun 2024',
			endYear: 'Present',
			position: 'Frontend Developer Team Lead',
			companyName: 'Impact Business Solutions',
			jobDescription:
				'Led a frontend development team for mobile and web app projects, contributing to both development and UI/UX design. Managed task distribution, code quality, and team collaboration to deliver scalable solutions.',
			skills: [
				'Node Js',
				'Svelte',
				'Typescript',
				'Tailwind',
				'Next Js',
				'React',
				'Flutter',
				'Dart'
			],
			responsibility: [
				'Design and develop responsive, seamless, and visually appealing user interfaces for web and mobile applications.',
				'Lead frontend development processes, ensuring high code quality, performance, and scalability.',
				'Manage and mentor a team of developers, allocating tasks and guiding growth.',
				'Collaborate with cross-functional teams to deliver user-centric, high-quality solutions.'
			]
		},
		{
			startYear: 'Jul 2023',
			endYear: 'May 2024',
			position: 'Software Developer Team Lead',
			companyName: 'Impact Business Solutions',
			jobDescription:
				'Led a team of developers in web and mobile platform development. Managed tasks, code reviews, and cross-functional collaboration. Directed UI/UX design to enhance user experiences while staying actively involved in development.',
			skills: ['Node Js', 'Svelte', 'Flutter', 'Dart', 'Typescript'],
			responsibility: [
				'Design and develop responsive, seamless, and visually appealing user interfaces for web and mobile applications.',
				'Lead frontend development processes, ensuring high code quality, performance, and scalability.',
				'Manage and mentor a team of developers, allocating tasks and guiding growth.',
				'Collaborate with cross-functional teams to deliver user-centric, high-quality solutions.'
			]
		},
		{
			startYear: 'Apr 2022',
			endYear: 'Jun 2023',
			position: 'Software Developer',
			companyName: 'Impact Business Solutions',
			jobDescription:
				'Developed full-stack web and mobile applications, managing both frontend and backend, including API integrations. Designed UI/UX for seamless user experiences. Collaborated with cross-functional teams to deliver scalable, high-performance solutions.',
			skills: ['Node Js', 'Angular', 'Typescript', 'Tailwind', '.Net', 'Flutter', 'Dart'],
			responsibility: [
				'Design and develop responsive, seamless, and visually appealing user interfaces for web and mobile applications.',
				'Lead frontend development processes, ensuring high code quality, performance, and scalability.',
				'Manage and mentor a team of developers, allocating tasks and guiding growth.',
				'Collaborate with cross-functional teams to deliver user-centric, high-quality solutions.'
			]
		},
		{
			startYear: 'Apr 2021',
			endYear: 'Mar 2022',
			position: 'Junior Software Developer',
			companyName: 'Data Solutions Sarawak',
			jobDescription:
				'Developed full-stack web applications using .NET MVC to support company operations. Designed tools to improve workflows and efficiency. Collaborated with teams to create scalable, user-friendly solutions that boosted productivity.',
			skills: ['DotNet', 'ASPX', 'C#', 'Javascript', 'jQuery', 'MSSql', 'Bootstrap'],
			responsibility: [
				'Design and develop responsive, seamless, and visually appealing user interfaces for web and mobile applications.',
				'Lead frontend development processes, ensuring high code quality, performance, and scalability.',
				'Manage and mentor a team of developers, allocating tasks and guiding growth.',
				'Collaborate with cross-functional teams to deliver user-centric, high-quality solutions.'
			]
		},
		{
			startYear: 'Oct 2020',
			endYear: 'Mar 2021',
			position: 'Software Developer Intern',
			companyName: 'Data Solutions Sarawak',
			jobDescription:
				'Assisted in developing full-stack web applications using .NET MVC for internal tools. Contributed to designing features that streamlined processes for the main product. Collaborated with the team to ensure functionality, quality, and performance.',
			skills: ['DotNet', 'ASPX', 'C#', 'Javascript', 'MSSql', 'Bootstrap'],
			responsibility: [
				'Design and develop responsive, seamless, and visually appealing user interfaces for web and mobile applications.',
				'Lead frontend development processes, ensuring high code quality, performance, and scalability.',
				'Manage and mentor a team of developers, allocating tasks and guiding growth.',
				'Collaborate with cross-functional teams to deliver user-centric, high-quality solutions.'
			]
		}
	];

	public static projects: ProjectDTO[] = [
		{
			title: 'IVS Mobile',
			description:
				"A mobile application for monitoring site's CCTV integrated with Huawei's IVS3800 video management system.",
			imageUrl: '/images/projects/ivs-mobile.png',
			redirectUrl: '',
			skills: ['Flutter', 'Dart', '.Net', 'FFMpeg']
		},
		{
			title: 'Company Profile Website',
			description: 'A revamp of the older version of the website in Svelte.',
			imageUrl: '/images/projects/ibs-web.png',
			redirectUrl: 'https://impact-multimedia.com/ibs/',
			skills: ['Node JS', 'Svelte', 'Tailwind', 'Typescript'],
			redirectPhrase: 'Visit website'
		},
		{
			title: 'Wedding RSVP',
			description: 'Website for guest to RSVP their attendance to my wedding reception.',
			imageUrl: '/images/projects/rsvp-web.png',
			redirectUrl: 'https://itsawedding.myracletech.com/',
			skills: ['Node JS', 'Svelte', '.Net'],
			redirectPhrase: 'Visit website'
		},
		{
			title: 'Face Recognition Using PCA Approach',
			description:
				'A part of a face recognition system for my Final Year Project during my study in University of Malaysia Sarawak.',
			imageUrl: '/images/projects/face-recognition.png',
			redirectUrl: 'https://www.youtube.com/watch?v=THHe9FBn5HA',
			skills: ['Python', 'OpenCV', 'Machine Learning'],
			redirectPhrase: 'View Demo'
		},
		{
			title: 'Smart Home Mobile App',
			description:
				'A collaboration project with my friend for his smart home. This serves as the controller to the home electronic appliance leveraging on Raspbery Pi. The project is still ongoing.',
			imageUrl: '/images/projects/smart-home.png',
			redirectUrl: '',
			skills: ['Node JS', 'Svelte', 'Tailwind', 'Typescript']
		}
	];
}
