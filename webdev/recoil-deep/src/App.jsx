import {
  RecoilRoot,
  useRecoilState,
  useRecoilStateLoadable,
  useRecoilValue,
  useRecoilValueLoadable,
  useSetRecoilState,
} from "recoil";
import "./App.css";
import {
  networkAtom,
  notificationAtom,
  JobskAtom,
  messagingAtom,
  todosFamily,
} from "./store/atoms/atoms";
import {
  TodosSelectorFamily,
  totalNotficationSelector,
} from "./store/selectors/selector";

function App() {
  return (
    <RecoilRoot>
      <Navbar />
      <Todo id={1} />
      <Todo id={2} />
      <span>this is from dummy json</span>
      <TodoDummy id={1} />
      <TodoDummy id={3} />
      <TodoDummy id={5} />
      <TodoDummy id={2} />
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

function Todo({ id }) {
  const currentTodo = useRecoilValue(todosFamily(id));

  return (
    <>
      <p>{currentTodo.title}</p>
      <p>{currentTodo.description}</p>
    </>
  );
}
function TodoDummy({ id }) {
  // const [todo, setTodo] = useRecoilStateLoadable(TodosSelectorFamily(id));
  const todo = useRecoilValueLoadable(TodosSelectorFamily(id));

  if (todo.state === "loading") {
    return <p>Loading....</p>;
  } else if (todo.state === "hasValue") {
    return (
      <>
        <p>{todo.contents.todo}</p>
        <p>{todo.contents.completed}</p>
      </>
    );
  } else if (todo.state === "hasError") {
    return <p>sorry ! occupide by error</p>;
  }
}
