import {
    Form,
    useLoaderData,
    redirect,
    useNavigate,
  } from "react-router-dom";
  import { updateContact } from "../contacts";
  import newContactIMG from "../assets/newContact.svg";
  import instagramIMG from "../assets/instagram.svg";
  import linkedinIMG from "../assets/linkedin.svg";
  import notesIMG from "../assets/notes.svg";
  import '../Edit.css';
  export async function action({ request, params }) {
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    await updateContact(params.contactId, updates);
    return redirect(`/contacts/${params.contactId}`);
  }
  

export default function EditContact() {
  const { contact } = useLoaderData();
  const navigate = useNavigate();

  return (
    <Form method="post" id="contact-form">
      <label>
        <img className="image-size" src={newContactIMG} alt="newContact" />
        <span>Name</span>
        <input
          placeholder="First"
          aria-label="First name"
          type="text"
          name="first"
          defaultValue={contact.first}
        />
        <input
          placeholder="Last"
          aria-label="Last name"
          type="text"
          name="last"
          defaultValue={contact.last}
        />
      </label>
      <label>
        <img className="image-size" src={instagramIMG} alt="instagram" />
        <span>Instagram</span>
        <input
          type="text"
          name="instagram"
          placeholder="@jack"
          defaultValue={contact.instagram}
        />
      </label>
      <label>
        <img className="image-size" src={linkedinIMG} alt="linkedin" />
        <span>LinkedIn</span>
        <input
          placeholder="https://example.com/linkedIn.com"
          aria-label="LinkedIn"
          type="text"
          name="linkedin"
          defaultValue={contact.linkedin}
        />
      </label>
      <label>
        <img className="image-size" src={notesIMG} alt="notes" />
        <span>Notes</span>
        <textarea
          name="notes"
          defaultValue={contact.notes}
          rows={6}
        />
      </label>
      <p>
        <button type="submit">Guardar</button>
        <button type="button" 
                  onClick={() => {
                    navigate(-1);
                  }}>Cancelar</button>
      </p>
    </Form>
  );
}