import { SystemConstant } from '$lib/constant/system.constant';
import type { ExperienceDTO, ProjectDTO } from '$lib/dto/system.dto';

export async function load() {
	const projects: ProjectDTO[] = SystemConstant.projects;
	const experience: ExperienceDTO[] = SystemConstant.experience;

	return {
		projects,
		experience
	};
}
