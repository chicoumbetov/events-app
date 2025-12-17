export default async function EventDetailPage(props: { params: { id: string } }) {
  const { id } = await props.params;

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Event Details: {id}</h1>
      <p>This is a placeholder for the event detail view as per the MVP requirements.</p>
    </div>
  );
}
