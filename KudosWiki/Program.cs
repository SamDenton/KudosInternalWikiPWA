using KudosWiki;
using KudosWiki.Shared;
using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using static KudosWiki.Pages.MainContent;

var builder = WebAssemblyHostBuilder.CreateDefault(args);
builder.RootComponents.Add<App>("#app");
builder.RootComponents.Add<HeadOutlet>("head::after");
//Console.WriteLine("test");
builder.Services.AddScoped(sp => new HttpClient { BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) });
//Console.WriteLine("test2");
builder.Services.AddSingleton<contentHolder>();
//Console.WriteLine("test3");
builder.Services.AddSingleton<MyStateContainer>();
//Console.WriteLine("test4");
builder.Services.AddMsalAuthentication(options =>
{
    builder.Configuration.Bind("AzureAd", options.ProviderOptions.Authentication);
    //Console.WriteLine("tes5");
});

builder.Services.AddMsalAuthentication(options => {
    builder.Configuration.Bind("AzureAd", options.ProviderOptions.Authentication); 
    options.ProviderOptions.DefaultAccessTokenScopes.Add("api://e6dd03c8-eff6-4110-a4e6-793dfaddf9fb/API.Access2"); 
    options.ProviderOptions.LoginMode = "redirect";
    //Console.WriteLine("test6");
});
//Console.WriteLine("test7");
await builder.Build().RunAsync();
//Console.WriteLine("test8");