import { useQuery, UseQueryResult } from "react-query";
import { fetchProjectById, fetchProjects } from "../../api/index";

interface Project {
  id: number;
  name: string;
  url: string;
  script?: string;
}

export const useProjects = (): UseQueryResult<Project[], unknown> => {
  return useQuery<Project[], unknown>({
    queryKey: "projects",
    queryFn: fetchProjects,
  });
};

export const useProject = (id: number): UseQueryResult<Project, unknown> => {
  return useQuery<Project, unknown>({
    queryKey: ["project", id],
    queryFn: async () => await fetchProjectById(id),
  });
}