var builder = WebApplication.CreateBuilder(args);

var app = builder.Build();

app.UseStaticFiles(); 
app.UseDefaultFiles(); 
app.UseHttpsRedirection();


app.MapGet("/users", async context =>
{
    context.Response.ContentType = "text/html";
    await context.Response.SendFileAsync("frontend/index.html");
});

app.MapGet("/users/{id}", (int id) =>
{
    return $"Reading users with ID:{id}";
});

app.MapPost("/users", () =>
{
    return "Creating new users";
});

app.MapPut("/users/{id}", (int id) =>
{
    return $"Updating users with ID:{id}";
});

app.MapDelete("/users/{id}", (int id) =>
{
    return $"Deleting users with ID:{id}";
});

app.Run();