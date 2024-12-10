import { SystemConstant } from '$lib/constant/system.constant';
import type { ProjectDTO } from '$lib/dto/system.dto';

export async function load() {
	const projects: ProjectDTO[] = SystemConstant.projects;

	return {
		projects
	};
}
