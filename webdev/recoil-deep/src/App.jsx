import {
  RecoilRoot,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import "./App.css";
import {
  networkAtom,
  notificationAtom,
  JobskAtom,
  messagingAtom,
} from "./store/atoms/atoms";
import { totalNotficationSelector } from "./store/selectors/selector";

function App() {
  return (
    <RecoilRoot>
      <Navbar />
    </RecoilRoot>
  );
}

export default App;

function Navbar() {
  const network = useRecoilValue(networkAtom);
  const notification = useRecoilValue(notificationAtom);
  const [jobs, setJobs] = useRecoilState(JobskAtom);
  const messages = useRecoilValue(messagingAtom);

  // total notification,

  const totalNotifications = useRecoilValue(totalNotficationSelector);

  const networkCount = network > 99 ? "99+" : network;
  const notificationCount = notification > 99 ? "99+" : notification;
  const jobsCount = jobs > 99 ? "99+" : jobs;
  const messagesCount = messages > 99 ? "99+" : messages;

  return (
    <div>
      <nav className="nav">
        <button>Home</button>

        <button>
          My Network{" "}
          {network > 0 ? <span className="span">{networkCount}</span> : null}
        </button>

        <button>
          Jobs {jobs > 0 ? <span className="span">{jobsCount}</span> : null}
        </button>
        <button>
          Message{" "}
          {messages > 0 ? <span className="span">{messagesCount}</span> : null}
        </button>
        <button>
          notification{" "}
          {notification > 0 ? (
            <span className="span">{notificationCount}</span>
          ) : null}
        </button>
        <button>Me {totalNotifications}</button>
      </nav>

      <div>
        <button
          onClick={() => {
            setJobs(jobs + 1);
          }}
        >
          increase Jobs
        </button>

        <UpdateNotification />
      </div>
    </div>
  );
}

function UpdateNotification() {
  const setNotificationCount = useSetRecoilState(notificationAtom);

  return (
    <>
      <button
        onClick={() => {
          setNotificationCount((c) => c + 1);
        }}
      >
        increase +{" "}
      </button>
      <button
        onClick={() => {
          setNotificationCount((c) => c - 1);
        }}
      >
        decrese +{" "}
      </button>
    </>
  );
}
