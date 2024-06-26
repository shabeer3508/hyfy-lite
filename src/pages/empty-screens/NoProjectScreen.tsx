import { useSelector } from 'react-redux';
import { ProjectType } from '@/interfaces';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { HiOutlineInbox } from 'react-icons/hi2'
import { reducerNameFromUrl, } from '@/redux/actions/AppActions';

const NoProjectScreen = () => {
    const navigate = useNavigate();
    const reducerName = reducerNameFromUrl("project", "GET");
    const projectList = useSelector((state: any) => state?.[reducerName])?.data?.items as ProjectType[];

    const hasProjects = projectList?.length > 0;

    return (
        <div className='flex flex-col justify-center h-full items-center'>
            <div>
                <HiOutlineInbox className="text-primary h-20 w-20 " />
            </div>
            <div className="text-primary text-4xl font-semibold">
                Nothing here !
            </div>
            <div className="dark:text-foreground text-xl my-3">
                {hasProjects && "Please select a project"}
                {!hasProjects &&
                    <div className='flex justify-center flex-col gap-4'>
                        <div>No projects found</div>
                        <Button type='button' className='text-white' onClick={() => navigate("/projects")}>Create Projects</Button>
                    </div>
                }
            </div>
        </div>
    )
}

export default NoProjectScreen