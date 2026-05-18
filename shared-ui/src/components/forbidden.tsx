import { Box, Container, Paper, Stack, Typography } from '@mui/material';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';

type ForbiddenProps = {
  title: string;
  description: string;
};

export function Forbidden({ title, description }: ForbiddenProps) {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={0}
          sx={{
            p: 6,
            borderRadius: 4,
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Stack spacing={3} alignItems="center">
            <ShieldOutlinedIcon
              sx={{
                fontSize: 48,
                color: 'error.main',
              }}
            />

            <Box textAlign="center">
              <Typography variant="h2" fontWeight={700}>
                403
              </Typography>

              <Typography variant="h5" fontWeight={600} mt={1}>
                {title}
              </Typography>

              <Typography variant="body2" color="text.secondary" mt={2}>
                {description}
              </Typography>
            </Box>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}
