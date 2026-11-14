import React from "react";
import "./Form.css";
export class FormValidation extends React.Component
{
    state=
    {
        name:"",
        Experience:"",
        nameError:"",
        ExperienceError:""
    }
    render()
    {
            const{nameError,ExperienceError}=this.state;
        return <React.Fragment>

            <h1>Client Side Validation</h1>
            <div className="Form-Data">
            <form onSubmit={(event)=>this.FormSubmit(event)}>
              
                <input name="name" 
                value={this.state.name} 
                onChange={(event)=>this.ChangeName(event)}
                placeholder="Enter your name"
                />
                {
                    nameError&&(
                        <div className="errorColor">
                            {nameError}
                        </div>
                    )}
                <br/>
                <input
                type="number"
                name="Experience" 
                value={this.state.Experience}
                placeholder="Enter your Experience"
                onChange={(event)=>this.ChangeName(event)}>
                </input>
                 {
                    ExperienceError&&(
                        <div className="errorColor">
                            {ExperienceError}
                        </div>
                    )}<br/>
                <button>Submit</button>
            </form>
                </div>
        </React.Fragment>

    }
   ChangeName(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    
    // Clear error messages when user starts typing
    const newState = {
      ...this.state,
      [name]: value,
    };
    
    // Clear specific error messages based on which field is being edited
    if (name === 'name') {
      newState.nameError = "";
    } else if (name === 'Experience') {
      newState.ExperienceError = "";
    }
    
    this.setState(newState);
  }
    FormSubmit(event:React.FormEvent<HTMLFormElement>)
    {
        event.preventDefault(); 
        const name = this.ValidateName(this.state.name);
        const Exp  = this.ValidateExp(this.state.Experience);
        this.setState(
            {
               ...this.state,
               nameError:name,
               ExperienceError:Exp
            }
        )
         if(!name&&!Exp)
         {
            alert(" Data Submitted ")
            this.setState({
                name:"",
                Experience:""
            })
         }
    }
   
ValidateName(sname:string):string{
    if(!sname||sname.trim().length===0)
    {
        return "Emp name is requied"
    }
    if(sname.length>7)
    {
        return "Name shd not more than 7"
    }
    if(sname.length<2)
    {
        return "Name shd more than 2"

    }
    return "";

}
ValidateExp(exp:string)
{
    const exp1 = Number(exp);
   if(!exp1)
    {
        return "Employee Experience is requied"
    }
    if(exp1>6)
    {

        return "Employee Experince should be around 6"
    }
    if(exp1<2)
    {
        return "Employee Experince should  more than 2"

    }
    return "";
}
 
}

export default FormValidation;