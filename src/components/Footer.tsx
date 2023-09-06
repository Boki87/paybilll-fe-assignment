import { BsGithub, BsLinkedin } from "react-icons/bs";

export const Footer = () => {
  return (
    <footer>
      <p>
        Assignment for a front end position at{" "}
        <a
          href="https://optima-apps.com/"
          target="_blank"
          className="text-blue-500 cursor-pointer hover:underline"
        >
          Optima Apps
        </a>{" "}
      </p>

      <div className="flex items-center gap-2 h-8">
        <p>Developed by Bojan Perić</p>
        <a
          href="https://github.com/Boki87"
          target="_blank"
          className="text-2xl"
        >
          <BsGithub />
        </a>
        <a
          href="https://www.linkedin.com/in/bojan-dev/"
          target="_blank"
          className="text-2xl"
        >
          <BsLinkedin />
        </a>
      </div>
    </footer>
  );
};
