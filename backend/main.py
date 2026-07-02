from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import requests

app = FastAPI()

# ✅ CORS FIX
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ HOME ROUTE
@app.get("/")
def home():
    return {"message": "SkillVerfy Backend Running 🚀"}

# ✅ GITHUB API ROUTE
@app.get("/github/{username}")
def get_github_profile(username: str):

    # GitHub user data
    user_url = f"https://api.github.com/users/{username}"

    # GitHub repos data
    repos_url = f"https://api.github.com/users/{username}/repos"

    user_response = requests.get(user_url)
    repos_response = requests.get(repos_url)

    # Convert JSON
    user_data = user_response.json()
    repos_data = repos_response.json()

    # Calculate stars
    total_stars = 0

    if isinstance(repos_data, list):
        for repo in repos_data:
            total_stars += repo.get("stargazers_count", 0)

    # Final response
    return {
        "username": user_data.get("login"),
        "name": user_data.get("name"),
        "followers": user_data.get("followers", 0),
        "following": user_data.get("following", 0),
        "public_repos": user_data.get("public_repos", 0),
        "profile_image": user_data.get("avatar_url"),
        "github_profile": user_data.get("html_url"),
        "stars": total_stars,

        # Fake commits for demo 😎
        "commits": total_stars * 3 + user_data.get("public_repos", 0) * 5
    }