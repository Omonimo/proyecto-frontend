import {
    Outlet,
    Link,
    useLoaderData,
    Form,
    useNavigation,
    useSubmit,
  } from "react-router-dom";
  import { getContacts, createContact } from "../contacts";
  import { useEffect } from "react";
  
  export async function action() {
    const contact = await createContact();
    return { contact };
  }
  export async function loader({ request }) {
    const url = new URL(request.url);
    const q = url.searchParams.get("q");
    const contacts = await getContacts(q);
  return { contacts, q };
}

export default function Root() {
  const { contacts, q } = useLoaderData();
  const navigation = useNavigation();
  const submit = useSubmit();

  const searching =
  navigation.location &&
  new URLSearchParams(navigation.location.search).has(
    "q"
  );

  useEffect(() => {
    document.getElementById("q").value = q;
  }, [q]);

    return (
      <>
        <div id="sidebar">
          <h1>React Router Contacts</h1>
          <div>

          <Form id="search-form" role="search">
              <input
                id="q"
                className={searching ? "cargando" : ""}
                aria-label="Buscar notas"
                placeholder="Buscar"
                type="search"
                name="q"
                defaultValue={q}
                onChange={(event) => {
                  const isFirstSearch = q == null;
                  submit(event.currentTarget.form, {
                    replace: !isFirstSearch,
                  });
                }}
              />
              <div
                id="search-spinner"
                aria-hidden
                hidden={!searching}
              />
              <div
                className="sr-only"
                aria-live="polite"
              ></div>
            </Form>
            
            <Form method="post">
            <button type="submit">Nueva Nota</button>
          </Form>
          </div>
          <nav>
          {contacts.length ? (
            <ul>
              {contacts.map((contact) => (
                <li key={contact.id}>
                  <Link to={`contacts/${contact.id}`}>
                    {contact.first || contact.last ? (
                      <>
                        {contact.first} {contact.last}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}{" "}
                    {contact.favorite && <span>★</span>}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>Sin notas</i>
            </p>
          )}
        </nav>

        </div>
        <div id="detail">
            <Outlet/>
        </div>
      </>
    );
  }