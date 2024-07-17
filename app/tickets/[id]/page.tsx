interface Params{
    id: string;
}

interface TicketDetailProps{
    params:Params;
}

async function getTicket(id: string){
    const response =  await fetch("http://localhost:4000/tickets/" + id, {
        next: {
            revalidate: 60
        }
    });
    return response.json();
}

export default async function TicketDetails({params}: TicketDetailProps) {
    const ticket = await getTicket(params.id);
    return (
        <div className="card">
            <h3>{ticket.title}</h3>
            <small>Created by {ticket.user_email}</small>
            <p>{ticket.body}</p>
            <div className={`pill ${ticket.priority}`}>
                {ticket.priority} priority
            </div>
        </div>
    )
}