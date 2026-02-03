import os
import yaml
from django.conf import settings

COURSES_DIR = os.path.join(settings.BASE_DIR, "courses")

def load_courses():
    courses = []

    if not os.path.isdir(COURSES_DIR):
        return courses

    for filename in os.listdir(COURSES_DIR):
        if not filename.endswith(".md"):
            continue

        path = os.path.join(COURSES_DIR, filename)

        with open(path, encoding="utf-8") as f:
            raw = f.read()

        meta = {}
        if raw.startswith("---"):
            try:
                _, fm, _ = raw.split("---", 2)
                meta = yaml.safe_load(fm) or {}
            except Exception:
                meta = {}

        slug = filename.replace(".md", "")

        courses.append({
            "slug": slug,
            "title": meta.get("title", slug.upper()),
            "icon": meta.get("icon", "book"),
            "order": meta.get("order", 999),
            "description": meta.get("description", ""),
        })

    return sorted(courses, key=lambda x: x["order"])
