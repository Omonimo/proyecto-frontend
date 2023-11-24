import {
  useLoaderData,
  Form,
  useFetcher,
} from "react-router-dom";
import { getContact, updateContact } from "../contacts";
import friendsImage from "../assets/friends.svg";

export async function action({ request, params }) {
  let formData = await request.formData();
  return updateContact(params.contactId, {
    favorite: formData.get("favorite") === "true",
  });
}


export async function loader({ params }) {
  const contact = await getContact(params.contactId);
  if (!contact) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }
  return { contact };
}

export default function Contact() {
  const { contact } = useLoaderData();

  return (
    <div id="contact">
      <div>
        <img
        /*
          key={contact.avatar}
          src={friendsImage}
          alt="friend"
          */
          key={contact.avatar}
          src={contact.avatar || friendsImage}
        />
      </div>

      <div>
        <h1>
          {contact.first || contact.last ? (
            <>
              {contact.first} {contact.last}
            </>
          ) : (
            <i>Sin Nombre</i>
          )}{" "}
          <Favorite contact={contact} />
        </h1>

        {contact.instagram && (
          <p>
            <a
              target="_blank"
              href={`https://instagram.com/${contact.instagram}`}
            >
              {contact.instagram}
            </a>
          </p>
        )}
        {contact.linkedin && (
          <p>
            <a className="linkedin"
              target="_blank"
              href={contact.linkedin}
            >
              {contact.linkedin}
            </a>
          </p>
        )}
        {contact.notes && <p>{contact.notes}</p>}

        <div>
          <Form action="edit">
            <button type="submit">Editar</button>
          </Form>
          <Form
            method="post"
            action="destroy"
            onSubmit={(event) => {
              if (
                !confirm(
                  "Confirme que desea eliminar este registro."
                )
              ) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit">Eliminar</button>
          </Form>
        </div>
      </div>
    </div>
  );
}

function Favorite({ contact }) {
  const fetcher = useFetcher();
  // yes, this is a `let` for later
  let favorite = contact.favorite;
  if (fetcher.formData) {
    favorite = fetcher.formData.get("favorite") === "true";
  }

  return (
    <fetcher.Form method="post">
      <button
        name="favorite"
        value={favorite ? "false" : "true"}
        aria-label={
          favorite
            ? "Eliminar de favoritos"
            : "Añadir a favoritos"
        }
      >
        {favorite ? "★" : "☆"}
      </button>
      </fetcher.Form>
  );
}