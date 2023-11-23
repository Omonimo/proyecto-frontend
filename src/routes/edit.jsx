import {
    Form,
    useLoaderData,
    redirect,
    useNavigate,
  } from "react-router-dom";
  import { updateContact } from "../contacts";
  
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
      <p>
        <span>Título</span>
        <input
          placeholder="Título"
          aria-label="First name"
          type="text"
          name="first"
          defaultValue={contact.first}
        />
      </p>
      <label>

      </label>
      <label>

      </label>
      <label>
        <span>Notes</span>
        <textarea
          name="notes"
          defaultValue={contact.notes}
          rows={6}
          placeholder="Escribe aqui tus notas!"
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