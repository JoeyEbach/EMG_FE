import { useEffect, useState } from 'react';
import { checkUser } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';
import RegisterForm from '../components/RegisterForm';
import { customerProjects, producerProjects } from '../api/projectData';
import ProjectCard from '../components/cards/ProjectCard';

function Home() {
  const [thisUser, setThisUser] = useState();
  const [userProjects, setUserProjects] = useState([]);
  const { user } = useAuth();
  document.querySelector('body').setAttribute('data-theme', 'site');

  const currentUser = () => {
    checkUser(user.uid)?.then((u) => {
      if (u.uid) {
        setThisUser(u);
      } else {
        setThisUser(null);
      }
    });
  };

  useEffect(() => {
    currentUser();
  }, [user]);

  const getProjects = async () => {
    if (thisUser) {
      if (thisUser.isProducer) {
        const pProjects = await producerProjects(thisUser.id);
        const current = pProjects?.filter((pp) => !pp.isComplete);
        setUserProjects(current);
      } else {
        const cProjects = await customerProjects(thisUser.id);
        const current = cProjects?.filter((cp) => !cp.isCompleted);
        setUserProjects(current);
      }
    }
  };

  useEffect(() => {
    getProjects();
  }, [thisUser]);

  return (
    <>
      {thisUser === null ? (<RegisterForm />) : (
        <div>
          <h1 className="heading center" style={{ marginTop: '50px' }}>Welcome back {user.fbUser.displayName}! </h1>
          <h5 className="heading center" style={{ marginBottom: '30px' }}>Here are your current active projects:</h5>
          <div className="projectCards">
            {userProjects.length ? userProjects?.map((up) => (
              !up.complete && (
                <ProjectCard key={up.id} projObj={up} />
              )
            )) : <p>No active projects found.</p>}
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
