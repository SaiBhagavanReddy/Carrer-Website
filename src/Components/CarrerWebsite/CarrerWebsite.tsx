import { useState } from "react";
import "../CarrerWebsite/CarrerWebsite.css";
import CloseIcon from "@mui/icons-material/Close";
import { supabase } from "../CarrerWebsite/supabaseClient/supabaseClient";

const CarrerWebsite = () => {
  const TypesOfJobs = [
    "All",
    "Engineering",
    "Infrastructure",
    "Design",
    "AI And ML",
  ];
  interface jobDataType {
    id?: number;
    Mode?: string;
    Name?: string;
    Experience?: string;
    location?: string;
    skillSet?: [""];
    ShowPoupRes?: boolean;
  }
  const [JobsForHost, setJobsForHost] = useState<jobDataType[]>([
    {
      id: 1,
      Mode: "OnSite",
      Name: "AI and ML Engineer",
      Experience: "3-4 Years",
      location: "Bangalore",
      skillSet: ["Python", "Machine Learning", "Deep Learning", "TensorFlow"],
    },
    {
      id: 2,
      Mode: "Hybrid",
      Name: "React JS Developer",
      Experience: "2-3 Years",
      location: "Hyderabad",
      skillSet: ["React JS", "JavaScript", "HTML5", "CSS3", "Redux"],
    },
    {
      id: 3,
      Mode: "Remote",
      Name: "Node JS Developer",
      Experience: "2-4 Years",
      location: "Chennai",
      skillSet: ["Node.js", "Express.js", "MongoDB", "REST API"],
    },
    {
      id: 4,
      Mode: "OnSite",
      Name: "Python Developer",
      Experience: "1-3 Years",
      location: "Pune",
      skillSet: ["Python", "Django", "Flask", "SQL"],
    },
    {
      id: 5,
      Mode: "Hybrid",
      Name: "Full Stack Developer",
      Experience: "3-5 Years",
      location: "Bangalore",
      skillSet: ["React JS", "Node.js", "MongoDB", "Express.js"],
    },
    {
      id: 6,
      Mode: "Remote",
      Name: "UI/UX Designer",
      Experience: "2-3 Years",
      location: "Mumbai",
      skillSet: ["Figma", "Adobe XD", "Wireframing", "Prototyping"],
    },
    {
      id: 7,
      Mode: "OnSite",
      Name: "Java Developer",
      Experience: "4-6 Years",
      location: "Hyderabad",
      skillSet: ["Java", "Spring Boot", "Hibernate", "Microservices"],
    },
    {
      id: 8,
      Mode: "Hybrid",
      Name: "DevOps Engineer",
      Experience: "3-5 Years",
      location: "Chennai",
      skillSet: ["Docker", "Kubernetes", "AWS", "Jenkins", "CI/CD"],
    },
    {
      id: 9,
      Mode: "Remote",
      Name: "Data Scientist",
      Experience: "2-4 Years",
      location: "Delhi",
      skillSet: ["Python", "SQL", "Pandas", "Machine Learning"],
    },
    {
      id: 10,
      Mode: "OnSite",
      Name: "Angular Developer",
      Experience: "2-3 Years",
      location: "Pune",
      skillSet: ["Angular", "TypeScript", "JavaScript", "RxJS", "HTML5"],
    },
  ]);
  const [ShowPop, setShowPop] = useState<jobDataType>({
    Mode: "",
    Name: "",
    Experience: "",
    location: "",
    skillSet: [""],
    ShowPoupRes: false,
  });
  interface EmpDetails {
    Name: string;
    Email: string;
    PhoneNumber: string;
    LinkdenUrl: string;
    ResumeDoc?: File;
  }
  const [showAll, setShowAll] = useState(false);
  const [isDragging, setisDragging] = useState(false);
  const [ResponseMsg,setResponseMsg] = useState(false);
  const [SubmitBtnState,setSubmitStateBtn] = useState(true);
  const [fileStorage, setfileStorage] = useState<EmpDetails>({
    Name: "",
    Email: "",
    PhoneNumber: "",
    LinkdenUrl: "",
    ResumeDoc: undefined,
  });
  const displayedJobs = showAll ? JobsForHost : JobsForHost.slice(0, 4);
  const [Error, setError] = useState("");

  const [SearchJob, setSearch] = useState("");
  const [SearchViaBtn, setSearchViaBtn] = useState("All");
  const ApplyJob = (name, location, Mode, Experience, skillSet): any => {
    setShowPop({
      ...ShowPop,
      ShowPoupRes: true,
      Mode: Mode,
      Experience: Experience,
      skillSet: skillSet,
      Name: name,
      location: location,
    });
  };
  const handleOver = (e:any) => {
    e.preventDefault();
    setisDragging(true);
  };
  const handleDrag = (e:any) => {
    e.preventDefault();
    const filename = e.dataTransfer.files[0];
    ValidateFile(filename);
  };
  const UploadViaInput = (e:any) => {
    e.preventDefault();
    ValidateFile(e.target.files[0]);
  };
  const ValidateFile = (ResumeName: any) => {
    if (!ResumeName) return;

    const allowedTypes = [
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/pdf",
    ];
    if (!allowedTypes.includes(ResumeName.type)) {
      setError("Only PDF, DOC, and DOCX files are allowed.");
      setfileStorage({ ...fileStorage, ResumeDoc: ResumeName });
      return;
    }
    if (ResumeName.size > 10 * 1024 * 1024) {
      setError("File size must be less than 10MB.");
      setfileStorage({ ...fileStorage, ResumeDoc: ResumeName });
      return;
    }
    setError("");
    setfileStorage({ ...fileStorage, ResumeDoc: ResumeName });
  };
  const SearchFilter = displayedJobs.filter((data) => {
    const nameOrLoc =
      data.Name?.toUpperCase().includes(SearchJob.toUpperCase()) ||
      data.location?.toUpperCase().includes(SearchJob.toUpperCase());
    const CategoryMatch =
      SearchViaBtn === "All" ||
      (SearchViaBtn === "Engineering" && data.Name?.endsWith("Developer")) ||
      (SearchViaBtn === "Infrastructure" && data.Name?.endsWith("Engineer")) ||
      (SearchViaBtn === "Design" && data.Name?.endsWith("Designer")) ||
      (SearchViaBtn === "AI And ML" && data.Name?.startsWith("AI"));
    return nameOrLoc && CategoryMatch;
  });

  const Searchbtn = (name: string) => {
    setSearchViaBtn(name);
  };
  const SubmitDetail = async (e: any) => {
    e.preventDefault();
    const rawFile = fileStorage.ResumeDoc;
    const filePath = `${Date.now()}_${rawFile?.name}`;
    // 2. Upload the raw File to your Storage bucket
    const { error: uploadError } = await supabase.storage
      .from("Resumes") // Replace with your bucket name
      .upload(filePath, rawFile);

    if (uploadError) {
      console.error("Upload failed:", uploadError.message);
      return;
    }
    // 3. Get the publicUrl STRING from Storage
    const { data: urlData } = supabase.storage
      .from("Resumes")
      .getPublicUrl(filePath);
    const { data, error,status } = await supabase
      .from("Carrer")
      .insert([
        {
          Name: fileStorage.Name,
          Email: fileStorage.Email,
          PhoneNumber: fileStorage.PhoneNumber,
          ResumeDoc: urlData.publicUrl,
          LinkdenorUrl: fileStorage.LinkdenUrl,
        },
      ])
      .select();
      if (error) {
        console.log(error.message);
      } 
      else {
        setSubmitStateBtn(true);
      if(status===201)
      {
        setSubmitStateBtn(false);
        setResponseMsg(prev=>!prev);  
        return;      
      }
    }
  };
  return (
    <>
      <div className="CarrerWebSiteMain">
        <div className="Content">
          <div className="HeaderwithSearch">
            <div className="Header">
              <header>
                <div className="notification">
                  <pre>Current Openings</pre>
                </div>
                <h3 style={{ paddingTop: "10px" }}>Find Your Dream Carrer</h3>
                <div className="description">
                  <p>
                    Explore high-impact roles, work on autonomous AI
                    <br /> systems, and collaborate with passionate builders in
                    <br /> our hyper-growth team.
                  </p>
                </div>
              </header>
            </div>
            <div className="JobSearch">
              <input
                type="text"
                placeholder="Search title or location"
                value={SearchJob}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          <div className="TypesOfJobsWithSearch">
            <div className="TypesOfJobs">
              {TypesOfJobs.map((btnName, ind) => (
                <>
                  <div>
                    <button key={ind} onClick={() => Searchbtn(btnName)}>
                      {btnName}
                    </button>
                  </div>
                </>
              ))}
              <div className="AllJobsButton">
                <button onClick={() => setShowAll((prev) => !prev)}>
                  {showAll ? "Hide" : "View All Openings"}
                </button>
              </div>
            </div>
            <div className="Jobs">
              {SearchFilter.map((jobDetails, ind) => (
                <>
                  <div className="EachJob">
                    <div key={ind} className="JobMode">
                      {<span>{jobDetails.Mode}</span>}
                    </div>
                    <div className="JobTitle">
                      <h2>{jobDetails.Name}</h2>
                      <p>{jobDetails.Experience}</p>
                      <pre>{jobDetails.location}</pre>
                      <p>{jobDetails.skillSet?.join(", ")}</p>
                    </div>
                    <div className="ApplyBtn">
                      <button
                        onClick={() =>
                          ApplyJob(
                            jobDetails.Name,
                            jobDetails.location,
                            jobDetails.Mode,
                            jobDetails.Experience,
                            jobDetails.skillSet,
                          )
                        }
                      >
                        Apply Now {"->"}
                      </button>
                    </div>
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
      {ShowPop.ShowPoupRes && (
        <>
          <div className="ApplyJobPopUp">
            <div className="Content-for-job">
              <div className="Job-Details">
                <div className="Header-with-closeIcon">
                  <header>
                    <h3>{ShowPop.Name}</h3>
                  </header>
                  <div>
                    <CloseIcon
                      style={{ color: "white" }}
                      onClick={() => {
                        setShowPop({ ...ShowPop, ShowPoupRes: false });
                        setResponseMsg(false);
                        setSubmitStateBtn(true);
                        setfileStorage({
                          ...fileStorage,
                          Email: "",
                          PhoneNumber: "",
                          Name: "",
                          LinkdenUrl: "",
                          ResumeDoc: undefined,
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="Other-Content">
                  <ul>
                    <li>{ShowPop?.location}</li>
                    <li>{ShowPop.Mode}</li>
                    <li>{ShowPop.Experience}</li>
                  </ul>
                </div>
                <form onSubmit={(e) => SubmitDetail(e)}>
                  <div className="Emp-Detail">
                    <label>
                      Full Name {"*"}
                      <input
                        type="text"
                        placeholder="eg. Nani"
                        value={fileStorage.Name}
                        required
                        onChange={(e) =>
                          setfileStorage({
                            ...fileStorage,
                            Name: e.target.value,
                          })
                        }
                      />
                    </label>
                    <div className="Email-with-phoneNumber">
                      <label>
                        Email Address {"*"}
                        <input
                          type="email"
                          value={fileStorage.Email}
                          required
                          placeholder="nani@gmail.com"
                          onChange={(e) =>
                            setfileStorage({
                              ...fileStorage,
                              Email: e.target.value,
                            })
                          }
                        />
                      </label>
                      <label>
                        Phone Number{"*"}
                        <input
                          type="text"
                          value={fileStorage.PhoneNumber}
                          required
                          maxLength={10}
                          placeholder="8564232322"
                          onChange={(e) =>
                            setfileStorage({
                              ...fileStorage,
                              PhoneNumber: e.target.value,
                            })
                          }
                        />
                      </label>
                    </div>
                    <label>
                      Github or Linkden Url {"(Optional)"}
                      <input
                        type="url"
                        placeholder="https://example.com"
                        value={fileStorage.LinkdenUrl}
                        
                        onChange={(e) =>
                          setfileStorage({
                            ...fileStorage,
                            LinkdenUrl: e.target.value,
                          })
                        }
                      />
                    </label>
                    <div className="DragAndDropResume">
                      <div>
                        <label>
                          Resume/CSV (PDF or Doc)
                          <div
                            className="Drag"
                            onDragOver={handleOver}
                            onDragLeave={() => setisDragging(false)}
                            onDrop={handleDrag}
                          >
                            <input
                              type="file"
                              required
                              onChange={(e) => UploadViaInput(e)}
                            />
                            <div className="resume-header">
                              <span>Click to Upload or Drag & Drop</span>
                              <pre>PDF,DOC upto 10Mb</pre>
                            </div>
                            {fileStorage.ResumeDoc && (
                              <>
                                <div className="Resume">
                                  {fileStorage.ResumeDoc.name}
                                  <div>
                                    <CloseIcon
                                      onClick={(e) => {
                                        e.preventDefault();
                                        setfileStorage({
                                          ...fileStorage,
                                          ResumeDoc: undefined,
                                        });
                                      }}
                                    />
                                  </div>
                                </div>
                                {Error && (
                                  <>
                                    <span
                                      style={{
                                        color: "red",
                                        textAlign: "center",
                                        padding: "10px",
                                      }}
                                    >
                                      {Error}
                                    </span>
                                  </>
                                )}
                              </>
                            )}
                          </div>
                        </label>
                      </div>
                    </div>
                    <div className="Resume-Submit-btn">
                      <button className={SubmitBtnState?"SubmitReq":"SubmittingData"}
                      disabled={!SubmitBtnState}>
                      {SubmitBtnState?"Submit application":"Submitted "}
                      </button>
                    <div className="ResponseMsg">
                      {ResponseMsg?(<>
                        <pre >
                            Resume has been Submitted
                        </pre>
                      </>):(<>
                      </>)
                        }
                    </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default CarrerWebsite;
