#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys


def main():
    """Run administrative tasks."""
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'octofit_tracker.settings')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    try:
        execute_from_command_line(sys.argv)
    except SystemExit as e:
        import traceback
        import socket
        import os

        traceback.print_exc()
        print(f"manage.py exited with SystemExit: {e.code}. Check command-line args and settings.")

        # Common cause: development server port (8000) already in use.
        try:
            s = socket.socket()
            s.settimeout(0.5)
            s.connect(("127.0.0.1", 8000))
            s.close()
            print("Diagnostic: port 8000 appears to be in use. Kill any running Django runserver processes and retry.")
            print("Example: ps aux | grep manage.py  && kill <pid>")
        except Exception:
            pass

        # Exit without re-raising to avoid an additional traceback in some environments
        try:
            code = int(e.code) if isinstance(e.code, int) or (isinstance(e.code, str) and e.code.isdigit()) else 1
        except Exception:
            code = 1
        os._exit(code)


if __name__ == '__main__':
    main()
